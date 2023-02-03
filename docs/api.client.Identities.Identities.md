# Class: Identities

[api/client/Identities](../wiki/api.client.Identities).Identities

Handles all Identity related functionality

## Table of contents

### Methods

- [createPortfolio](../wiki/api.client.Identities.Identities#createportfolio)
- [createPortfolios](../wiki/api.client.Identities.Identities#createportfolios)
- [getIdentity](../wiki/api.client.Identities.Identities#getidentity)
- [isIdentityValid](../wiki/api.client.Identities.Identities#isidentityvalid)
- [registerIdentity](../wiki/api.client.Identities.Identities#registeridentity)

## Methods

### createPortfolio

▸ **createPortfolio**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)[], [`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio), `unknown`[][]\>\>

Create a new Portfolio under the ownership of the signing Identity

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [createPortfolio.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.name` | `string` |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)[], [`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio), `unknown`[][]\>\>

___

### createPortfolios

▸ **createPortfolios**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)[], [`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)[], `unknown`[][]\>\>

Creates a set of new Portfolios under the ownership of the signing Identity

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [createPortfolios.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.names` | `string`[] |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)[], [`NumberedPortfolio`](../wiki/api.entities.NumberedPortfolio.NumberedPortfolio)[], `unknown`[][]\>\>

___

### getIdentity

▸ **getIdentity**(`args`): `Promise`<[`Identity`](../wiki/api.entities.Identity.Identity)\>

Create an Identity instance from a DID

**`Throws`**

 if there is no Identity with the passed DID

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.did` | `string` |

#### Returns

`Promise`<[`Identity`](../wiki/api.entities.Identity.Identity)\>

___

### isIdentityValid

▸ **isIdentityValid**(`args`): `Promise`<`boolean`\>

Return whether the supplied Identity/DID exists

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.identity` | `string` \| [`Identity`](../wiki/api.entities.Identity.Identity) |

#### Returns

`Promise`<`boolean`\>

___

### registerIdentity

▸ **registerIdentity**(`args`, `opts?`): `Promise`<`TransactionQueue`<[`Identity`](../wiki/api.entities.Identity.Identity), [`Identity`](../wiki/api.entities.Identity.Identity), `unknown`[][]\>\>

Register an Identity

**`Note`**

 must be a CDD provider

**`Note`**

 this may create [Authorization Requests](../wiki/api.entities.AuthorizationRequest.AuthorizationRequest) which have to be accepted by the `targetAccount`.
  An [Account](../wiki/api.entities.Account.Account) or [Identity](../wiki/api.entities.Identity.Identity) can fetch its pending Authorization Requests by calling [authorizations.getReceived](../wiki/api.entities.common.namespaces.Authorizations.Authorizations#getreceived).
  Also, an Account or Identity can directly fetch the details of an Authorization Request by calling [authorizations.getOne](../wiki/api.entities.common.namespaces.Authorizations.Authorizations#getone)

**`Note`**

 required role:
  - Customer Due Diligence Provider

**`Note`**

 this method is of type [ProcedureMethod](../wiki/types.ProcedureMethod), which means you can call [registerIdentity.checkAuthorization](../wiki/types.ProcedureMethod#checkauthorization)
  on it to see whether the signing Account and Identity have the required roles and permissions to run it

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`RegisterIdentityParams`](../wiki/api.procedures.types.RegisterIdentityParams) |
| `opts?` | [`ProcedureOpts`](../wiki/types.ProcedureOpts) |

#### Returns

`Promise`<`TransactionQueue`<[`Identity`](../wiki/api.entities.Identity.Identity), [`Identity`](../wiki/api.entities.Identity.Identity), `unknown`[][]\>\>
