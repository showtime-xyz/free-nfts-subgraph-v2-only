import { BigInt, Bytes, ethereum, log } from "@graphprotocol/graph-ts";

import { CreatedEdition as CreatedEditionEventV2 } from "../../generated/GatedEditionCreator/GatedEditionCreator"
import { Edition } from "../../generated/GatedEditionCreator/Edition";
import { FreeNFTDrop } from "../../generated/schema";

export default function handleCreatedEdition(event: CreatedEditionEventV2): void {
  let collectionAddress = event.params.editionContractAddress;
  let edition = Edition.bind(collectionAddress);

  let entity = new FreeNFTDrop(collectionAddress);
  entity.createdAt = event.block.timestamp;
  entity.creator = event.params.creator;
  entity.editionSize = edition.editionSize();
  entity.name = edition.name();
  entity.description = edition.description();
  entity.imageUrl = edition.imageUrl();
  entity.animationUrl = edition.animationUrl();
  entity.deadline = edition.endOfMintPeriod();
  entity.save()
}
