const config = require('../../../config');
const errors = require('../../../errors/errors');
const { OrderValidator } = require('../../../server/validators');

const { maxAcceptablePayment, minAcceptablePayment } = config.server;
const orderValidator = new OrderValidator();
let items = [];

describe('order logic validation', () => {
  beforeEach(() => {
    items = [
      {
        item: {
          name: 'testItemOne',
          available: true,
          availabilityCount: 10,
          price: 100,
        },
        count: 2,
      },
      {
        item: {
          name: 'testItemTwo',
          available: true,
          availabilityCount: 10,
          price: 100,
        },
        count: 2,
      },
    ];
  });

  test('validate max value payment fraud returns no fraud operation', async () => {
    try {
      const itemsTotalPrice =
        orderValidator.validateMaxValuePaymentFraud(items);
      let expectedTotalPrice = 0;
      items.forEach((element) => {
        expectedTotalPrice += element.item.price * element.count;
      });
      expect(itemsTotalPrice).toBe(expectedTotalPrice);
    } catch (error) {
      expect(error).toBe(null);
    }
  });

  test('validate max value payment fraud returns fraud operation', async () => {
    items[0].item.price = maxAcceptablePayment;
    try {
      orderValidator.validateMaxValuePaymentFraud(items);
      expect(true).toBe(false); // test should fail if this line is reached
    } catch (error) {
      expect(error).toBeInstanceOf(errors.BadRequest);
      expect(error.statusCode).toBe(400);
    }
  });

  test('validate min value payment returns validation pass successfully', async () => {
    try {
      const itemsTotalPrice = minAcceptablePayment + 1;
      orderValidator.validateMinPurchaseValue(itemsTotalPrice);
      expect(true).toBe(true); // test should succeed if this line is reached with no thrown errors
    } catch (error) {
      expect(true).toBe(false); // test should fail if an error is thrown
    }
  });

  test('validate min value payment throws error', async () => {
    try {
      const itemsTotalPrice = minAcceptablePayment - 1;
      orderValidator.validateMinPurchaseValue(itemsTotalPrice);
      expect(true).toBe(false); // test should succeed if this line is reached with no thrown errors
    } catch (error) {
      expect(error).toBeInstanceOf(errors.BadRequest);
      expect(error.statusCode).toBe(400);
    }
  });

  test('validate basket items availability should succeed', async () => {
    try {
      const { availabilityCount } = items[0].item;
      const { count } = items[0];
      orderValidator.validateBasketItemsAvailability(items);
      expect(true).toBe(true); // test should succeed if this line is reached with no thrown errors
      expect(items[0].item.availabilityCount).toBe(availabilityCount - count);
    } catch (error) {
      expect(true).toBe(false); // test should fail if an error is thrown
    }
  });

  test('validate basket items availability should throw an error', async () => {
    try {
      items[0].item.availabilityCount = -1; // the amount to be purchased > item available amount
      orderValidator.validateBasketItemsAvailability(items);
      expect(true).toBe(false); // test should succeed if this line is reached with no thrown errors
    } catch (error) {
      expect(error).toBeInstanceOf(errors.BadRequest);
      expect(error.statusCode).toBe(400);
      expect(items[0].item.available).toBe(false);
    }
  });
});
