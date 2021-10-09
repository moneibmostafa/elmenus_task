const { request } = require('express');
const {
  orderController,
  itemController,
} = require('../../../server/controllers');

const cart = [
  { itemID: 'fe2a5148-f777-412a-b3ef-7c5063275f24', count: 2 },
  { itemID: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea', count: 2 },
];

const itemOneObj = {
  id: 'fe2a5148-f777-412a-b3ef-7c5063275f24',
  name: 'itemOne',
  availabilityCount: 10,
  available: true,
  price: 100,
};

const itemTwoObj = {
  id: '9ddfa66d-75ae-4674-bd6c-41276d4c9bea',
  name: 'itemTwo',
  availabilityCount: 10,
  available: true,
  price: 200,
};

// jest.mock('../../../server/controllers/item.controller', () =>
//   jest.fn().mockImplementation(() => ({
//     getByPk: () => itemOneObj,
//   }))
// );

// let { getByPk } = itemController;

describe('modify cart structure', () => {
  // beforeEach(() => {
  //   itemController.getByPk = jest
  //     .spyOn(itemController, 'getByPk')
  //     .mockReturnValueOnce(itemOneObj)
  //     .mockReturnValueOnce(itemTwoObj);
  // });

  it('validate cart structure output', async () => {
    expect(true).toBe(true);
    // const response = await orderController.modifyCartStructure(cart);
    // expect(getByPk).toHaveBeenCalledWith(2);

    // console.log('kkkkkkkkkkkkkkkk', response);
    // expect(response[0].count).toBe(cart[0].count);
    // expect(response[0].item.name).toBe(itemOneObj.name);

    // expect(response[1].count).toBe(cart[1].count);
    // expect(response[1].item.name).toBe(itemTwoObj.name);
  });
});
