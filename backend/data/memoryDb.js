const bcrypt = require('bcryptjs');

let users = [
  {
    id: 1,
    name: "Юлия",
    email: "m2408814@misis.edu.ru",
    age: 19,
    passwordHash: bcrypt.hashSync('julia123', 10),
    gifts: [
      {
        id: 101,
        title: "Наушники беспроводные с шумоподавлением",
        imageUrl: "https://ir.ozone.ru/s3/multimedia-1-l/wc1000/8855966001.jpg",
        description: "Любые крутые!!!",
        price: 1643,
        link: "https://www.ozon.ru/product/https://www.ozon.ru/product/naushniki-besprovodnye-pro-2-s-shumopodavleniem-naushniki-besprovodnye-dlya-telefona-lux-kachestvo-3900408381/?at=28t04rwOYCN6Gno0c2B4GLrIAXz9PwSx6Q7N9T5P5PBA-1000xm5",
        status: "free",
        reservedBy: null
      },
      {
        id: 102,
        title: "Серебряное кольцо",
        imageUrl: "https://ir.ozone.ru/s3/multimedia-1-m/wc1000/8852678590.jpg",
        description: "Кольцо большое размер 18",
        price: 1498,
        link: "https://www.ozon.ru/product/serebryanoe-koltso-zhenskoe-925-proby-s-kamnyami-fianitami-serebro-sokolov-355014412/?at=Brtzkq4BGs1MEqXmH2w359ksyAPOmJT8x1Q57c0XV8pQ",
        status: "free",
        reservedBy: null
      }
    ]
  },
  {
    id: 2,
    name: "Дарья",
    email: "veter228@mail.ru",
    age: 20,
    passwordHash: bcrypt.hashSync('dasha123', 10),
    gifts: [
      {
        id: 103,
        title: "Кружка с именем Даша",
        imageUrl: "https://ir.ozone.ru/s3/multimedia-1-l/wc1000/9116215509.jpg",
        description: "Очень хочу смешную кружку",
        price: 247,
        link: "https://www.ozon.ru/product/kruzhka-s-prikolom-s-imenem-dasha-330-ml-1-sht-3550388133/?at=gpt4j62p3t5v26MGHk5Yo83TjKrlPwt6kAMNPUDNoL2k",
        status: "free",
        reservedBy: null
      }
    ]
  }
];

const admin = {
  id: 999,
  email: "admin@gifthub.com",
  passwordHash: bcrypt.hashSync('admin123', 10),
  name: "Администратор",
  role: "admin"
};

let nextUserId = 3;
let nextGiftId = 104;

module.exports = { users, admin, nextUserId, nextGiftId };
