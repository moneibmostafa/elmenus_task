const { orderController } = require('../../../server/controllers');
const ItemAdapter = require('../../../server/adapters/database/item.adapter');

// mock get items by id from database
jest.mock('./../../../server/adapters/database/item.adapter', () =>
  jest.fn().mockImplementation(() => ({
    getByPk: jest
      .fn()
      .mockReturnValueOnce({
        id: 'fe2a5148-f777-412a-b3ef-7c5063275f24',
        name: 'itemOne',
        availabilityCount: 10,
        available: true,
        price: 100,
      })
      .mockReturnValueOnce({
        id: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea',
        name: 'itemTwo',
        availabilityCount: 10,
        available: true,
        price: 200,
      }),
  }))
);

let cart = [];
describe('populate cart', () => {
  beforeEach(() => {
    cart = [
      { itemID: 'fe2a5148-f777-412a-b3ef-7c5063275f24', count: 2 },
      { itemID: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea', count: 2 },
    ];
    ItemAdapter.mockClear();
  });

  it('validate cart structure output successful', async () => {
    const populatedCart = await orderController.populateCart(cart);

    expect(populatedCart[0].count).toBe(cart[0].count);
    expect(populatedCart[0].item).not.toBeInstanceOf(String);
    expect(populatedCart[0].item).toBeInstanceOf(Object);
    expect(populatedCart[0].item.name).toBe('itemOne');

    expect(populatedCart[1].count).toBe(cart[1].count);
    expect(populatedCart[1].item).not.toBeInstanceOf(String);
    expect(populatedCart[1].item).toBeInstanceOf(Object);
    expect(populatedCart[1].item.name).toBe('itemTwo');
  });
});
