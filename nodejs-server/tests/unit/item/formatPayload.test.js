const { itemController } = require('../../../server/controllers');

let item = {};
describe('format item payload', () => {
  beforeEach(() => {
    item = {
      name: 'itemOne',
      price: 100.123,
      availabilityCount: 10,
    };
  });

  it('validate format item payload correctly with availability count > 0', async () => {
    const formatedPayload = await itemController.formatPayload(item);
    expect(formatedPayload.available).toBe(true);
  });

  it('validate format item payload correctly with availability count <= 0', async () => {
    item.availabilityCount = 0;
    const formatedPayload = await itemController.formatPayload(item);
    expect(formatedPayload.available).toBe(false);
  });

  it('validate format item payload correctly with price formatted correctly', async () => {
    const formatedPayload = await itemController.formatPayload(item);
    expect(formatedPayload.price).toBe(item.price.toFixed(2));
  });
});
