# Module: api/entities/Instruction/types

## Table of contents

### Enumerations

- [AffirmationStatus](../wiki/api.entities.Instruction.types.AffirmationStatus)
- [InstructionStatus](../wiki/api.entities.Instruction.types.InstructionStatus)
- [InstructionType](../wiki/api.entities.Instruction.types.InstructionType)

### Interfaces

- [InstructionAffirmation](../wiki/api.entities.Instruction.types.InstructionAffirmation)
- [Leg](../wiki/api.entities.Instruction.types.Leg)

### Type Aliases

- [InstructionDetails](../wiki/api.entities.Instruction.types#instructiondetails)
- [InstructionStatusResult](../wiki/api.entities.Instruction.types#instructionstatusresult)

## Type Aliases

### InstructionDetails

Ƭ **InstructionDetails**: { `createdAt`: `Date` ; `status`: [`InstructionStatus`](../wiki/api.entities.Instruction.types.InstructionStatus) ; `tradeDate`: `Date` \| ``null`` ; `valueDate`: `Date` \| ``null`` ; `venue`: [`Venue`](../wiki/api.entities.Venue.Venue)  } & { `type`: [`SettleOnAffirmation`](../wiki/api.entities.Instruction.types.InstructionType#settleonaffirmation)  } \| { `endBlock`: `BigNumber` ; `type`: [`SettleOnBlock`](../wiki/api.entities.Instruction.types.InstructionType#settleonblock)  }

#### Defined in

[api/entities/Instruction/types.ts:17](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Instruction/types.ts#L17)

___

### InstructionStatusResult

Ƭ **InstructionStatusResult**: { `status`: [`Pending`](../wiki/api.entities.Instruction.types.InstructionStatus#pending)  } \| { `eventIdentifier`: [`EventIdentifier`](../wiki/types.EventIdentifier) ; `status`: `Exclude`<[`InstructionStatus`](../wiki/api.entities.Instruction.types.InstructionStatus), [`Pending`](../wiki/api.entities.Instruction.types.InstructionStatus#pending)\>  }

#### Defined in

[api/entities/Instruction/types.ts:57](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Instruction/types.ts#L57)
