import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import idl from "./data_emitter.json";
import fs from "fs";
export const walletKey = Keypair.fromSecretKey(
  Uint8Array.from(fs.readFileSync("wallet.json"))
);

export const wallet = new NodeWallet(walletKey);
console.log(wallet.publicKey.toBase58());
export const provider = new AnchorProvider(
  new Connection("http://127.0.0.1:8899"),
  wallet,
  {
    preflightCommitment: "recent",
  }
);
export const program = new Program(
  idl as Idl,
  new PublicKey("7rBruuDkGkxxAp7FBioR69erziibEYRLzE8KaC4AX9FF"),
  provider
);
export const listenToProgramForEvents = async () => {
  let listener = 0;
  console.log("listener ->");
  let [event, slot] = await new Promise((resolve, _reject) => {
    listener = program.addEventListener("MyEvent", (event, slot) => {
      resolve([event, slot]);
    });
    // program.rpc.initialize({});
  });
  await program.removeEventListener(listener);
  console.log("listener ->", slot, event);
};
