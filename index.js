const { connect, StringCodec } = require("nats");
const telegramBotService = require("./telegramService.js");
require('dotenv').config();

const servers = [process.env.NATS_URL];
const sc = StringCodec();
servers.forEach(async (v) => {
  try {
    const nc = await connect(v);

    // this promise indicates the client closed
    const done = nc.closed();
    // do something with the connection

    nc.subscribe("todo-message", {
      queue: "todo",
      callback: (_err, _msg) => {
        const message = `<i>A TODO was created: </i><b>${sc.decode(
          _msg.data
        )}</b>`;
        telegramBotService.sendMessage(1936336992, message);
      },
    });

    // close the connection
    //await nc.drain();
    // check if the close was OK
    const err = await done;
    if (err) {
      console.log(`error closing:`, err);
    }
  } catch (err) {
    console.log(`error connecting to ${JSON.stringify(v)}`);
  }
});
