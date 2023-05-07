/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PickUpContract extends Contract {
    async pickUpExists(ctx, pickUpId) {
        const buffer = await ctx.stub.getState(pickUpId);
        return !!buffer && buffer.length > 0;
    }

    async createPickUp(ctx, pickUpId, value) {
        const exists = await this.pickUpExists(ctx, pickUpId);
        if (exists) {
            throw new Error(`The pick up ${pickUpId} already exists`);
        }
        try {
            const asset = this._validatePickUp(value);
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(pickUpId, buffer);
        } catch (error) {
            throw new Error(`Register failed with message: ${error.message}`);
        }
    }

    _validatePickUp(pickUp) {
        let parsedPickUp;
        try {
            parsedPickUp = JSON.parse(pickUp);
        } catch (error) {
            throw new Error('Invalid JSON object received');
        }
        this._validateFields(parsedPickUp);
        return parsedPickUp;
    }

    _validateFields(pickUp) {
        const VALID_FIELDS = [
            { name: 'driver', type: 'string' },
            { name: 'truck', type: 'string' },
            { name: 'dateTime', type: 'number' },
            { name: 'quantity', type: 'number' },
            { name: 'UOM', type: 'string' },
        ];
        const receivedFields = Object.keys(pickUp);
        if (receivedFields.length === 0) {
            throw new Error('Invalid JSON object received');
        }
        VALID_FIELDS.forEach((field) => {
            // Verifica se dados recebidos apresentam os atributos esperados e se o tipo do valor destes foi enviado dentro do esperado
            if (
                !receivedFields.includes(field.name) ||
                typeof pickUp[field.name] !== field.type
            ) {
                throw new Error(
                    `Missing or invalid data: ${
                        field.name
                    }, please insert all required fields and verify the type of each one: ${JSON.stringify(
                        VALID_FIELDS
                    )}`
                );
            }
        });
    }



    async readPickUp(ctx, pickUpId) {
        const exists = await this.pickUpExists(ctx, pickUpId);
        if (!exists) {
            throw new Error(`The pick up ${pickUpId} does not exist`);
        }
        const buffer = await ctx.stub.getState(pickUpId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePickUp(ctx, pickUpId, newValue) {
        const exists = await this.pickUpExists(ctx, pickUpId);
        if (!exists) {
            throw new Error(`The pick up ${pickUpId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(pickUpId, buffer);
    }

    async deletePickUp(ctx, pickUpId) {
        const exists = await this.pickUpExists(ctx, pickUpId);
        if (!exists) {
            throw new Error(`The pick up ${pickUpId} does not exist`);
        }
        await ctx.stub.deleteState(pickUpId);
    }

    async _iteratorToIterable(iterator) {
        let allResults = [];
        let result = await iterator.next();
        while (!result.done) {
            if (result.value && result.value.value.toString()) {
                let jsonRes = {};
                jsonRes.key = result.value.key;
                try {
                    jsonRes.record = JSON.parse(result.value.value.toString('utf8'));
                } catch (err) {
                    jsonRes.record = result.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            result = await iterator.next();
        }
        iterator.close();
        return allResults;
    }

    async queryPickUpsByRange(ctx, init, end) {
        const queryResult = await ctx.stub.getStateByRange(init, end);
        const results = await this._iteratorToIterable(queryResult);
        return results;
    }

    async queryByStringSelector(ctx, fields) {
        const query = JSON.stringify({ selector: JSON.parse(fields) });
        const queryResult = await ctx.stub.getQueryResult(query);
        const results = await this._iteratorToIterable(queryResult);
        return results;
    }

    async queryPickUpsByRangeWithPagination(ctx, init, end, pageSize, bookmark) {
        const queryResult = await ctx.stub.getStateByRangeWithPagination(init, end, pageSize, bookmark);
        const newBookmark = queryResult.metadata.bookmark;
        const results = await this._iteratorToIterable(queryResult.iterator);
        return { newBookmark, results };
    }

    async queryByStringSelectorWithPagination(ctx, fields, pageSize, bookmark) {
        const query = JSON.stringify({ selector: JSON.parse(fields) });
        const queryResult = await ctx.stub.getQueryResultWithPagination(query, pageSize, bookmark);
        const newBookmark = queryResult.metadata.bookmark;
        const results = await this._iteratorToIterable(queryResult.iterator);
        return { newBookmark, results };
    }

}

module.exports = PickUpContract;
