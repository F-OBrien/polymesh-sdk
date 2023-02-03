# Class: Schedules

[api/entities/Asset/Checkpoints/Schedules](../wiki/api.entities.Asset.Checkpoints.Schedules).Schedules

Handles all Asset Checkpoint Schedules related functionality

## Hierarchy

- `Namespace`<[`Asset`](../wiki/api.entities.Asset.Asset)\>

  ↳ **`Schedules`**

## Table of contents

### Methods

- [complexityOf](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#complexityof)
- [create](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#create)
- [currentComplexity](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#currentcomplexity)
- [get](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#get)
- [getOne](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#getone)
- [maxComplexity](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#maxcomplexity)
- [remove](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#remove)

## Methods

### complexityOf

▸ **complexityOf**(`period`): `BigNumber`

Calculate an abstract measure of the complexity of a given Calendar Period

#### Parameters

| Name | Type |
| :------ | :------ |
| `period` | [`CalendarPeriod`](../wiki/types.CalendarPeriod) |

#### Returns

`BigNumber`

___

### create

▸ **create**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`CheckpointSchedule`](../wiki/api.entities.CheckpointSchedule.CheckpointSchedule), [`CheckpointSchedule`](../wiki/api.entities.CheckpointSchedule.CheckpointSchedule), `unknown`[][]\>\>

Create a schedule for Checkpoint creation (i.e. "Create a checkpoint every week for 5 weeks, starting next tuesday")

**`Note`**

 due to chain limitations, schedules are advanced and (if appropriate) executed whenever the Asset is
  redeemed, issued or transferred between portfolios. This means that on an Asset without much movement, there may be disparities between intended Checkpoint creation dates
  and the actual date when they are created. This, however, has no effect on the Checkpoint's accuracy regarding to balances

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [create.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`CreateCheckpointScheduleParams`](../wiki/api.procedures.types.CreateCheckpointScheduleParams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`CheckpointSchedule`](../wiki/api.entities.CheckpointSchedule.CheckpointSchedule), [`CheckpointSchedule`](../wiki/api.entities.CheckpointSchedule.CheckpointSchedule), `unknown`[][]\>\>

___

### currentComplexity

▸ **currentComplexity**(): `Promise`<`BigNumber`\>

Calculate the sum of the complexity of all current Checkpoint Schedules for this Asset.
  The number cannot exceed the Asset's maximum complexity (obtained via [maxComplexity](../wiki/api.entities.Asset.Checkpoints.Schedules.Schedules#maxcomplexity))

#### Returns

`Promise`<`BigNumber`\>

___

### get

▸ **get**(): `Promise`<[`ScheduleWithDetails`](../wiki/types.ScheduleWithDetails)[]\>

Retrieve all active Checkpoint Schedules

#### Returns

`Promise`<[`ScheduleWithDetails`](../wiki/types.ScheduleWithDetails)[]\>

___

### getOne

▸ **getOne**(`__namedParameters`): `Promise`<[`ScheduleWithDetails`](../wiki/types.ScheduleWithDetails)\>

Retrieve a single Checkpoint Schedule associated to this Asset by its ID

**`Throws`**

 if there is no Schedule with the passed ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.id` | `BigNumber` |

#### Returns

`Promise`<[`ScheduleWithDetails`](../wiki/types.ScheduleWithDetails)\>

___

### maxComplexity

▸ **maxComplexity**(): `Promise`<`BigNumber`\>

Retrieve the maximum allowed Schedule complexity for this Asset

#### Returns

`Promise`<`BigNumber`\>

___

### remove

▸ **remove**(`args`, `opts?`): `Promise`<`TransactionQueue`<`void`, `void`, `unknown`[][]\>\>

Remove the supplied Checkpoint Schedule for a given Asset

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [remove.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`RemoveCheckpointScheduleParams`](../wiki/api.procedures.types.RemoveCheckpointScheduleParams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<`void`, `void`, `unknown`[][]\>\>
