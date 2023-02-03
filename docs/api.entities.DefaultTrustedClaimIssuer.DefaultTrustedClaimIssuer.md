# Class: DefaultTrustedClaimIssuer

[api/entities/DefaultTrustedClaimIssuer](../wiki/api.entities.DefaultTrustedClaimIssuer).DefaultTrustedClaimIssuer

Represents a default trusted claim issuer for a specific Asset in the Polymesh blockchain

## Hierarchy

- [`Identity`](../wiki/api.entities.Identity.Identity)

  ↳ **`DefaultTrustedClaimIssuer`**

## Table of contents

### Properties

- [asset](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#asset)
- [assetPermissions](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#assetpermissions)
- [authorizations](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#authorizations)
- [did](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#did)
- [portfolios](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#portfolios)
- [uuid](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#uuid)

### Methods

- [addedAt](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#addedat)
- [addedAtV2](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#addedatv2)
- [areSecondaryAccountsFrozen](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#aresecondaryaccountsfrozen)
- [checkRoles](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#checkroles)
- [exists](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#exists)
- [getAssetBalance](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getassetbalance)
- [getHeldAssets](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getheldassets)
- [getHeldAssetsV2](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getheldassetsv2)
- [getInstructions](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getinstructions)
- [getPendingDistributions](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getpendingdistributions)
- [getPendingInstructions](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getpendinginstructions)
- [getPrimaryAccount](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getprimaryaccount)
- [getScopeId](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getscopeid)
- [getSecondaryAccounts](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getsecondaryaccounts)
- [getTrustingAssets](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#gettrustingassets)
- [getTrustingAssetsV2](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#gettrustingassetsv2)
- [getVenues](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#getvenues)
- [hasRole](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#hasrole)
- [hasRoles](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#hasroles)
- [hasValidCdd](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#hasvalidcdd)
- [isCddProvider](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#iscddprovider)
- [isEqual](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#isequal)
- [isGcMember](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#isgcmember)
- [toHuman](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#tohuman)
- [trustedFor](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#trustedfor)
- [generateUuid](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#generateuuid)
- [unserialize](../wiki/api.entities.DefaultTrustedClaimIssuer.DefaultTrustedClaimIssuer#unserialize)

## Properties

### asset

• **asset**: [`Asset`](../wiki/api.entities.Asset.Asset)

Asset for which this Identity is a Default Trusted Claim Issuer

#### Defined in

[api/entities/DefaultTrustedClaimIssuer.ts:39](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/DefaultTrustedClaimIssuer.ts#L39)

___

### assetPermissions

• **assetPermissions**: [`AssetPermissions`](../wiki/api.entities.Identity.AssetPermissions.AssetPermissions)

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[assetPermissions](../wiki/api.entities.Identity.Identity#assetpermissions)

#### Defined in

[api/entities/Identity/index.ts:106](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Identity/index.ts#L106)

___

### authorizations

• **authorizations**: [`IdentityAuthorizations`](../wiki/api.entities.Identity.IdentityAuthorizations.IdentityAuthorizations)

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[authorizations](../wiki/api.entities.Identity.Identity#authorizations)

#### Defined in

[api/entities/Identity/index.ts:104](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Identity/index.ts#L104)

___

### did

• **did**: `string`

Identity ID as stored in the blockchain

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[did](../wiki/api.entities.Identity.Identity#did)

#### Defined in

[api/entities/Identity/index.ts:101](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Identity/index.ts#L101)

___

### portfolios

• **portfolios**: [`Portfolios`](../wiki/api.entities.Identity.Portfolios.Portfolios)

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[portfolios](../wiki/api.entities.Identity.Identity#portfolios)

#### Defined in

[api/entities/Identity/index.ts:105](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Identity/index.ts#L105)

___

### uuid

• **uuid**: `string`

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[uuid](../wiki/api.entities.Identity.Identity#uuid)

#### Defined in

[api/entities/Entity.ts:46](https://github.com/PolymeshAssociation/polymesh-sdk/blob/e978aefd/src/api/entities/Entity.ts#L46)

## Methods

### addedAt

▸ **addedAt**(): `Promise`<``null`` \| [`EventIdentifier`](../wiki/types.EventIdentifier)\>

Retrieve the identifier data (block number, date and event index) of the event that was emitted when the trusted claim issuer was added

**`Note`**

 uses the middleware

**`Note`**

 there is a possibility that the data is not ready by the time it is requested. In that case, `null` is returned

#### Returns

`Promise`<``null`` \| [`EventIdentifier`](../wiki/types.EventIdentifier)\>

___

### addedAtV2

▸ **addedAtV2**(): `Promise`<``null`` \| [`EventIdentifier`](../wiki/types.EventIdentifier)\>

Retrieve the identifier data (block number, date and event index) of the event that was emitted when the trusted claim issuer was added

**`Note`**

 uses the middlewareV2

**`Note`**

 there is a possibility that the data is not ready by the time it is requested. In that case, `null` is returned

#### Returns

`Promise`<``null`` \| [`EventIdentifier`](../wiki/types.EventIdentifier)\>

___

### areSecondaryAccountsFrozen

▸ **areSecondaryAccountsFrozen**(): `Promise`<`boolean`\>

Check whether secondary Accounts are frozen

**`Note`**

 can be subscribed to

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[areSecondaryAccountsFrozen](../wiki/api.entities.Identity.Identity#aresecondaryaccountsfrozen)

▸ **areSecondaryAccountsFrozen**(`callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<`boolean`\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[areSecondaryAccountsFrozen](../wiki/api.entities.Identity.Identity#aresecondaryaccountsfrozen)

___

### checkRoles

▸ **checkRoles**(`roles`): `Promise`<[`CheckRolesResult`](../wiki/types.CheckRolesResult)\>

Check whether this Identity possesses all specified roles

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | [`Role`](../wiki/types#role)[] |

#### Returns

`Promise`<[`CheckRolesResult`](../wiki/types.CheckRolesResult)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[checkRoles](../wiki/api.entities.Identity.Identity#checkroles)

___

### exists

▸ **exists**(): `Promise`<`boolean`\>

Determine whether this Identity exists on chain

**`Note`**

 asset Identities aren't considered to exist for this check

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[exists](../wiki/api.entities.Identity.Identity#exists)

___

### getAssetBalance

▸ **getAssetBalance**(`args`): `Promise`<`BigNumber`\>

Retrieve the balance of a particular Asset

**`Note`**

 can be subscribed to

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.ticker` | `string` |

#### Returns

`Promise`<`BigNumber`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getAssetBalance](../wiki/api.entities.Identity.Identity#getassetbalance)

▸ **getAssetBalance**(`args`, `callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.ticker` | `string` |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<`BigNumber`\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getAssetBalance](../wiki/api.entities.Identity.Identity#getassetbalance)

___

### getHeldAssets

▸ **getHeldAssets**(`opts?`): `Promise`<[`ResultSet`](../wiki/types.ResultSet)<[`Asset`](../wiki/api.entities.Asset.Asset)\>\>

Retrieve a list of all Assets which were held at one point by this Identity

**`Note`**

 uses the middleware

**`Note`**

 supports pagination

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.order?` | [`Order`](../wiki/types.Order) |
| `opts.size?` | `BigNumber` |
| `opts.start?` | `BigNumber` |

#### Returns

`Promise`<[`ResultSet`](../wiki/types.ResultSet)<[`Asset`](../wiki/api.entities.Asset.Asset)\>\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getHeldAssets](../wiki/api.entities.Identity.Identity#getheldassets)

___

### getHeldAssetsV2

▸ **getHeldAssetsV2**(`opts?`): `Promise`<[`ResultSet`](../wiki/types.ResultSet)<[`Asset`](../wiki/api.entities.Asset.Asset)\>\>

Retrieve a list of all Assets which were held at one point by this Identity

**`Note`**

 uses the middlewareV2

**`Note`**

 supports pagination

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.order?` | `AssetHoldersOrderBy` |
| `opts.size?` | `BigNumber` |
| `opts.start?` | `BigNumber` |

#### Returns

`Promise`<[`ResultSet`](../wiki/types.ResultSet)<[`Asset`](../wiki/api.entities.Asset.Asset)\>\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getHeldAssetsV2](../wiki/api.entities.Identity.Identity#getheldassetsv2)

___

### getInstructions

▸ **getInstructions**(): `Promise`<[`GroupedInstructions`](../wiki/types.GroupedInstructions)\>

Retrieve all Instructions where this Identity is a participant,
  grouped by status

#### Returns

`Promise`<[`GroupedInstructions`](../wiki/types.GroupedInstructions)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getInstructions](../wiki/api.entities.Identity.Identity#getinstructions)

___

### getPendingDistributions

▸ **getPendingDistributions**(): `Promise`<[`DistributionWithDetails`](../wiki/types.DistributionWithDetails)[]\>

Retrieve every Dividend Distribution for which this Identity is eligible and hasn't been paid

**`Note`**

 uses the middleware

**`Note`**

 this query can be potentially **SLOW** depending on which Assets this Identity has held

#### Returns

`Promise`<[`DistributionWithDetails`](../wiki/types.DistributionWithDetails)[]\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getPendingDistributions](../wiki/api.entities.Identity.Identity#getpendingdistributions)

___

### getPendingInstructions

▸ **getPendingInstructions**(): `Promise`<[`Instruction`](../wiki/api.entities.Instruction.Instruction)[]\>

Retrieve all pending Instructions involving this Identity

**`Deprecated`**

 in favor of `getInstructions`

#### Returns

`Promise`<[`Instruction`](../wiki/api.entities.Instruction.Instruction)[]\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getPendingInstructions](../wiki/api.entities.Identity.Identity#getpendinginstructions)

___

### getPrimaryAccount

▸ **getPrimaryAccount**(): `Promise`<[`PermissionedAccount`](../wiki/types.PermissionedAccount)\>

Retrieve the primary Account associated with the Identity

**`Note`**

 can be subscribed to

#### Returns

`Promise`<[`PermissionedAccount`](../wiki/types.PermissionedAccount)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getPrimaryAccount](../wiki/api.entities.Identity.Identity#getprimaryaccount)

▸ **getPrimaryAccount**(`callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<[`PermissionedAccount`](../wiki/types.PermissionedAccount)\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getPrimaryAccount](../wiki/api.entities.Identity.Identity#getprimaryaccount)

___

### getScopeId

▸ **getScopeId**(`args`): `Promise`<``null`` \| `string`\>

Retrieve the Scope ID associated to this Identity's Investor Uniqueness Claim for a specific Asset, or null
  if there is none

**`Note`**

 more on Investor Uniqueness [here](https://developers.polymesh.network/introduction/identity#polymesh-unique-identity-system-puis) and
  [here](https://developers.polymesh.network/polymesh-docs/primitives/confidential-identity)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.asset` | `string` \| [`Asset`](../wiki/api.entities.Asset.Asset) |

#### Returns

`Promise`<``null`` \| `string`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getScopeId](../wiki/api.entities.Identity.Identity#getscopeid)

___

### getSecondaryAccounts

▸ **getSecondaryAccounts**(`paginationOpts?`): `Promise`<[`ResultSet`](../wiki/types.ResultSet)<[`PermissionedAccount`](../wiki/types.PermissionedAccount)\>\>

Get the list of secondary Accounts related to the Identity

**`Note`**

 supports pagination

**`Note`**

 can be subscribed to

#### Parameters

| Name | Type |
| :------ | :------ |
| `paginationOpts?` | [`PaginationOptions`](../wiki/types.PaginationOptions) |

#### Returns

`Promise`<[`ResultSet`](../wiki/types.ResultSet)<[`PermissionedAccount`](../wiki/types.PermissionedAccount)\>\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getSecondaryAccounts](../wiki/api.entities.Identity.Identity#getsecondaryaccounts)

▸ **getSecondaryAccounts**(`callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<[`PermissionedAccount`](../wiki/types.PermissionedAccount)[]\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getSecondaryAccounts](../wiki/api.entities.Identity.Identity#getsecondaryaccounts)

▸ **getSecondaryAccounts**(`paginationOpts`, `callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `paginationOpts` | [`PaginationOptions`](../wiki/types.PaginationOptions) |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<[`PermissionedAccount`](../wiki/types.PermissionedAccount)[]\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getSecondaryAccounts](../wiki/api.entities.Identity.Identity#getsecondaryaccounts)

___

### getTrustingAssets

▸ **getTrustingAssets**(): `Promise`<[`Asset`](../wiki/api.entities.Asset.Asset)[]\>

Get the list of Assets for which this Identity is a trusted claim issuer

**`Note`**

 uses the middleware

#### Returns

`Promise`<[`Asset`](../wiki/api.entities.Asset.Asset)[]\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getTrustingAssets](../wiki/api.entities.Identity.Identity#gettrustingassets)

___

### getTrustingAssetsV2

▸ **getTrustingAssetsV2**(): `Promise`<[`Asset`](../wiki/api.entities.Asset.Asset)[]\>

Get the list of Assets for which this Identity is a trusted claim issuer

**`Note`**

 uses the middlewareV2

#### Returns

`Promise`<[`Asset`](../wiki/api.entities.Asset.Asset)[]\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getTrustingAssetsV2](../wiki/api.entities.Identity.Identity#gettrustingassetsv2)

___

### getVenues

▸ **getVenues**(): `Promise`<[`Venue`](../wiki/api.entities.Venue.Venue)[]\>

Retrieve all Venues created by this Identity

**`Note`**

 can be subscribed to

#### Returns

`Promise`<[`Venue`](../wiki/api.entities.Venue.Venue)[]\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getVenues](../wiki/api.entities.Identity.Identity#getvenues)

▸ **getVenues**(`callback`): `Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`SubCallback`](../wiki/types#subcallback)<[`Venue`](../wiki/api.entities.Venue.Venue)[]\> |

#### Returns

`Promise`<[`UnsubCallback`](../wiki/types#unsubcallback)\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[getVenues](../wiki/api.entities.Identity.Identity#getvenues)

___

### hasRole

▸ **hasRole**(`role`): `Promise`<`boolean`\>

Check whether this Identity possesses the specified Role

#### Parameters

| Name | Type |
| :------ | :------ |
| `role` | [`Role`](../wiki/types#role) |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[hasRole](../wiki/api.entities.Identity.Identity#hasrole)

___

### hasRoles

▸ **hasRoles**(`roles`): `Promise`<`boolean`\>

Check whether this Identity possesses all specified roles

**`Deprecated`**

 in favor of `checkRoles`

#### Parameters

| Name | Type |
| :------ | :------ |
| `roles` | [`Role`](../wiki/types#role)[] |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[hasRoles](../wiki/api.entities.Identity.Identity#hasroles)

___

### hasValidCdd

▸ **hasValidCdd**(): `Promise`<`boolean`\>

Check whether this Identity has a valid CDD claim

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[hasValidCdd](../wiki/api.entities.Identity.Identity#hasvalidcdd)

___

### isCddProvider

▸ **isCddProvider**(): `Promise`<`boolean`\>

Check whether this Identity is a CDD provider

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[isCddProvider](../wiki/api.entities.Identity.Identity#iscddprovider)

___

### isEqual

▸ **isEqual**(`entity`): `boolean`

Determine whether this Entity is the same as another one

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](../wiki/api.entities.Entity.Entity)<`unknown`, `unknown`\> |

#### Returns

`boolean`

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[isEqual](../wiki/api.entities.Identity.Identity#isequal)

___

### isGcMember

▸ **isGcMember**(): `Promise`<`boolean`\>

Check whether this Identity is Governance Committee member

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[isGcMember](../wiki/api.entities.Identity.Identity#isgcmember)

___

### toHuman

▸ **toHuman**(): `string`

Return the Identity's DID

#### Returns

`string`

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[toHuman](../wiki/api.entities.Identity.Identity#tohuman)

___

### trustedFor

▸ **trustedFor**(): `Promise`<``null`` \| [`ClaimType`](../wiki/types.ClaimType)[]\>

Retrieve claim types for which this Claim Issuer is trusted. A null value means that the issuer is trusted for all claim types

#### Returns

`Promise`<``null`` \| [`ClaimType`](../wiki/types.ClaimType)[]\>

___

### generateUuid

▸ `Static` **generateUuid**<`Identifiers`\>(`identifiers`): `string`

Generate the Entity's UUID from its identifying properties

#### Type parameters

| Name |
| :------ |
| `Identifiers` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `identifiers` | `Identifiers` |

#### Returns

`string`

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[generateUuid](../wiki/api.entities.Identity.Identity#generateuuid)

___

### unserialize

▸ `Static` **unserialize**<`Identifiers`\>(`serialized`): `Identifiers`

Unserialize a UUID into its Unique Identifiers

#### Type parameters

| Name |
| :------ |
| `Identifiers` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serialized` | `string` | UUID to unserialize |

#### Returns

`Identifiers`

#### Inherited from

[Identity](../wiki/api.entities.Identity.Identity).[unserialize](../wiki/api.entities.Identity.Identity#unserialize)
