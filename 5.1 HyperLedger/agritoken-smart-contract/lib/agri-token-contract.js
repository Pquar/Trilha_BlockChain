/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class AgriTokenContract extends Contract {

    async agriTokenExists(ctx, agriTokenId) {
        const buffer = await ctx.stub.getState(agriTokenId);
        return (!!buffer && buffer.length > 0);
    }

    async createAgriToken(ctx, agriTokenId, value) {
        const exists = await this.agriTokenExists(ctx, agriTokenId);
        if (exists) {
            throw new Error(`The agri token ${agriTokenId} already exists`);
        }
        const asset = JSON.parse(value);
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(agriTokenId, buffer);
        return `Token ${agriTokenId} created`;
    }

    async addInvestor(ctx, agriTokenId, value) {
        const exists = await this.agriTokenExists(ctx, agriTokenId);
        if (!exists) {
            throw new Error(`The agri token ${agriTokenId} does not exist`);
        }
        const token = await this.readAgriToken(ctx, agriTokenId);
        const newInvestor = JSON.parse(value);
        token.investors.push(newInvestor);
        token.totalRaised += newInvestor.investedValue;
        const buffer = Buffer.from(JSON.stringify(token));
        await ctx.stub.putState(agriTokenId, buffer);
        return `Investor added to token ${agriTokenId}`;
    }

    async addEvent(ctx, agriTokenId, value, status) {
        const exists = await this.agriTokenExists(ctx, agriTokenId);
        if (!exists) {
            throw new Error(`The agri token ${agriTokenId} does not exist`);
        }
        const token = await this.readAgriToken(ctx, agriTokenId);
        const newEvent = JSON.parse(value);
        token.events.push(newEvent);
        token.status = status ? status : token.status;
        const buffer = Buffer.from(JSON.stringify(token));
        await ctx.stub.putState(agriTokenId, buffer);
        return `Event added to token ${agriTokenId}`;
    }

    async readAgriToken(ctx, agriTokenId) {
        const exists = await this.agriTokenExists(ctx, agriTokenId);
        if (!exists) {
            throw new Error(`The agri token ${agriTokenId} does not exist`);
        }
        const buffer = await ctx.stub.getState(agriTokenId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async readAgriTokenTokenHistory(ctx, agriTokenId) {
        const historyResult = await ctx.stub.getHistoryForKey(agriTokenId);
        const history = await this._historyIteratorToIterable(historyResult);
        history.reverse();
        return history;
    }

    async _historyIteratorToIterable(iterator) {
        let allResults = [];
        let result = await iterator.next();
        while (!result.done) {
            if (result.value && result.value.value.toString()) {
                let jsonResult = {};
                jsonResult.txId = result.value.txId;
                jsonResult.timestamp = this._convertUnixToDate(result.value.timestamp);
                try {
                    jsonResult.value = JSON.parse(result.value.value.toString('utf8'));
                } catch (error) {
                    jsonResult.value = result.value.value.toString('utf8');
                }
                allResults.push(jsonResult);
            }
            result = await iterator.next();
        }
        iterator.close();
        return allResults;
    }

    _convertUnixToDate(unixTimestamp) {
        const secondsInMillis = unixTimestamp.seconds.low * 1000;
        const nanosInMillis = unixTimestamp.nanos / (1000 * 1000);
        const milliseconds = secondsInMillis + nanosInMillis;
        return new Date(milliseconds);
    }

}

module.exports = AgriTokenContract;
