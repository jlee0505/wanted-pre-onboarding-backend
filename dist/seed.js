"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Company, Job, sequelize } = require('./models');
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync();
        const company = yield Company.create({
            name: 'Example Corp',
            country: 'USA',
            location: 'New York',
        });
        yield Job.create({
            companyId: company.id,
            position: 'Software Engineer',
            reward: 120000,
            description: 'Looking for a skilled software engineer.',
            skills: 'JavaScript, Node.js',
        });
        console.log('Seeding completed!');
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
});
seed();
