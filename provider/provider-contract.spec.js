const { Verifier } = require('@pact-foundation/pact');
const { importData, server } = require('./provider')

importData();
const port = '3001';

const options = {
  provider: 'MoviesAPI',
  providerBaseUrl: `http://localhost:${port}`,
  pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  consumerVersionTags: ['main'],
};

const verifier = new Verifier(options);
describe('Pact Verification', () => {
    test('should validate the expectations of movie-consumer', () => {
        return verifier
            .verifyProvider()
            .then(output => {
                console.log('Pact Verification Complete!'); console.log('Result:', output);
            })
    });
});