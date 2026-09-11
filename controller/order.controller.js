

const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {

        const body = req.body;

        // 🔥 REMOVE _id from items
        body.items = body.items.map(item => ({
            name: item.name,
            price: item.price,
            // kg: item.kg
            quantity: item.quantity,
            unit: item.unit
        }));
        const order = await Order.create(body);

        // send whatsapp after save
        const whatsappUrls = await sendWhatsApp(order);
        console.log("WhatsApp URL====>", whatsappUrls);
        return res.json({
            order,
            whatsappUrls:[whatsappUrls]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

//   async function sendWhatsApp(order) {

//     const adminNumbers = process.env.ADMIN_MOBILE ? JSON.parse(process.env.ADMIN_MOBILE) : [];

//     let message = `🛒 New Order\n\n`;
//     message += ` STORE NAME: ${process.env.STORE_NAME}\n`;
//     message += `👤 Name: ${order.customerName}\n`;
//     message += `📞 Phone: ${order.phone}\n\n`;

//     message += `📦 Items:\n`;

//     // order.items.forEach((item, i) => {
//     //     message += `${i + 1}. ${item.name} - ${item.kg}kg × ₹${item.price} = ₹${item.kg * item.price}\n`;
//     // });
//     order.items.forEach((item, i) => {
//   message += `${i + 1}. ${item.name} - ${item.quantity}${item.unit} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
// });

//     message += `\n💰 Total: ₹${order.total}`;

//     const encoded = encodeURIComponent(message);

//      return adminNumbers.map(num => {
//     const url = `https://wa.me/${num}?text=${encoded}`;
//     console.log("WhatsApp URL1111:", url);
//     return url;
//   });
// }

// async function sendWhatsApp(order) {

//     let adminNumbers = [];

//     try {
//         adminNumbers = process.env.ADMIN_MOBILE
//             ? JSON.parse(process.env.ADMIN_MOBILE)
//             : [];
//     } catch (err) {
//         console.error("Invalid ADMIN_MOBILE JSON");
//     }

//     const total = order.items.reduce((sum, item) => {
//         return sum + (item.quantity * item.price);
//     }, 0);

//     let message = `🛒 New Order\n\n`;
//     message += `STORE NAME: ${process.env.STORE_NAME}\n`;
//     message += `👤 Name: ${order.customerName}\n`;
//     message += `📞 Phone: ${order.phone}\n\n`;
//     message += `📦 Items:\n`;

//     order.items.forEach((item, i) => {
//         message += `${i + 1}. ${item.name} - ${item.quantity}${item.unit} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
//     });

//     message += `\n💰 Total: ₹${total}`;

//     const encoded = encodeURIComponent(message);

//     return adminNumbers.map(num => {
//         return `https://wa.me/${num}?text=${encoded}`;
//     });
// }
async function sendWhatsApp(order) {

  const adminNumbers = JSON.parse(process.env.ADMIN_MOBILE);

  let message = `🛒 New Order\n\n`;
  message += `STORE: ${process.env.STORE_NAME}\n`;
  message += `Name: ${order.customerName}\n`;
  message += `Phone: ${order.phone}\n\n`;

  order.items.forEach((item, i) => {
    message += `${i + 1}. ${item.name} - ${item.quantity}${item.unit} × ₹${item.price}\n`;
  });

  message += `\nTotal: ₹${order.total}`;

  const encoded = encodeURIComponent(message);

  // ✅ separate link for each admin
  const urls = adminNumbers.map(num => {
    return `https://wa.me/${num}?text=${encoded}`;
  });

  return urls;
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};