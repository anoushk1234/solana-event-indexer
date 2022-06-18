import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { program, wallet, walletKey } from "../emitter_program";
import { it } from "mocha";
describe("init", async () => {
  it("initialize1", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({})
      .signers([walletKey])
      .rpc();
    console.log("heres the tx1", tx);
  }).timeout(20000);
  it("initialize2", async () => {
    const tx = await program.rpc.initialize({});
    console.log("heres the tx2", tx);
  }).timeout(20000);
  it("initialize2", async () => {
    const tx = await program.rpc.initialize({});
    console.log("heres the tx3", tx);
  }).timeout(20000);
});
