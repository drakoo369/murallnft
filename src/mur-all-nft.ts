import {
  Transfer as TransferEvent,
  MurAllNFT as MurAllNFTContract,
} from "../generated/MurAllNFT/MurAllNFT"
import {Token, User } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString());
  if(!token){
    token = new Token(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.createdAtTimestamp = event.block.timestamp;
    let tokenContract = MurAllNFTContract.bind(event.address);
    token.tokenId = event.params.tokenId;
    token.contentURI = tokenContract.tokenURI(event.params.tokenId);
  }

  token.owner = event.params.to.toHexString();
  token.save();

  let user = User.load(event.params.to.toHexString());
  if(!user){
    user = new User(event.params.to.toHexString());
    user.save();
  }

}
 