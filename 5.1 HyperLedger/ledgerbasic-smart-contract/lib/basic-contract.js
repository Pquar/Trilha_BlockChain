/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class BasicContract extends Contract {
    async basicExists(ctx, basicId) {
        const buffer = await ctx.stub.getState(basicId);
        return !!buffer && buffer.length > 0;
    }

    async createState(context, value) {
        const key = v4();
        const exists = await stateExists(context, key);
        if (exists) {
            throw new RegisterExistsException();
        }

        try {
            await context.stub.putState(key, serialize(value));
            return key;
        } catch (exception) {
            throw new BaseLedgerException();
        }
    }

    async readState(context, key) {
        const exists = await stateExists(context, key);
        if (!exists) {
            throw new RegisterNotExistsException();
        }

        try {
            const buffer = await context.stub.getState(key);
            return JSON.parse(buffer.toString('utf-8'));
        } catch (exception) {
            throw new BaseLedgerException();
        }
    }

    async updateState(context, key, value) {
        const exists = await stateExists(context, key);
        if (!exists) {
            throw new RegisterNotExistsException();
        }

        try {
            await context.stub.putState(key, serialize(value));
            return key;
        } catch (exception) {
            throw new BaseLedgerException();
        }
    }

    async deleteState(context, key) {
        const exists = await stateExists(context, key);
        if (!exists) {
            throw new RegisterNotExistsException();
        }

        try {
            await context.stub.deleteState(key);
        } catch (exception) {
            throw new BaseLedgerException();
        }
    }

    serialize(value) {
        return Buffer.from(JSON.stringify(value), 'utf-8');
    }
}

module.exports = BasicContract;
