// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type {
  ConfidentialIdentityV2ClaimProofsScopeClaimProof,
  ConfidentialIdentityV2ClaimProofsZkProofData,
  ConfidentialIdentityV2SignSignature,
  FinalityGrandpaEquivocationPrecommit,
  FinalityGrandpaEquivocationPrevote,
  FinalityGrandpaPrecommit,
  FinalityGrandpaPrevote,
  FrameSupportDispatchDispatchClass,
  FrameSupportDispatchDispatchInfo,
  FrameSupportDispatchPays,
  FrameSupportDispatchPerDispatchClassU32,
  FrameSupportDispatchPerDispatchClassWeight,
  FrameSupportDispatchPerDispatchClassWeightsPerClass,
  FrameSupportDispatchRawOrigin,
  FrameSupportPreimagesBounded,
  FrameSupportTokensMiscBalanceStatus,
  FrameSystemAccountInfo,
  FrameSystemCall,
  FrameSystemError,
  FrameSystemEvent,
  FrameSystemEventRecord,
  FrameSystemExtensionsCheckGenesis,
  FrameSystemExtensionsCheckNonce,
  FrameSystemExtensionsCheckSpecVersion,
  FrameSystemExtensionsCheckTxVersion,
  FrameSystemExtensionsCheckWeight,
  FrameSystemLastRuntimeUpgradeInfo,
  FrameSystemLimitsBlockLength,
  FrameSystemLimitsBlockWeights,
  FrameSystemLimitsWeightsPerClass,
  FrameSystemPhase,
  PalletAssetAssetOwnershipRelation,
  PalletAssetCall,
  PalletAssetCheckpointCall,
  PalletAssetCheckpointError,
  PalletAssetCheckpointScheduleSpec,
  PalletAssetClassicTickerImport,
  PalletAssetClassicTickerRegistration,
  PalletAssetError,
  PalletAssetSecurityToken,
  PalletAssetTickerRegistration,
  PalletAssetTickerRegistrationConfig,
  PalletAuthorshipCall,
  PalletAuthorshipError,
  PalletAuthorshipUncleEntryItem,
  PalletBabeCall,
  PalletBabeError,
  PalletBalancesBalanceLock,
  PalletBalancesCall,
  PalletBalancesError,
  PalletBaseCall,
  PalletBaseError,
  PalletBridgeBridgeTx,
  PalletBridgeBridgeTxDetail,
  PalletBridgeBridgeTxStatus,
  PalletBridgeCall,
  PalletBridgeError,
  PalletBridgeHandledTxStatus,
  PalletBridgeRawEvent,
  PalletCommitteeCall,
  PalletCommitteeError,
  PalletCommitteeInstance1,
  PalletCommitteeInstance3,
  PalletCommitteeInstance4,
  PalletCommitteePolymeshVotes,
  PalletCommitteeRawEventInstance1,
  PalletCommitteeRawEventInstance3,
  PalletCommitteeRawEventInstance4,
  PalletCommitteeRawOriginInstance1,
  PalletCommitteeRawOriginInstance3,
  PalletCommitteeRawOriginInstance4,
  PalletComplianceManagerCall,
  PalletComplianceManagerError,
  PalletComplianceManagerEvent,
  PalletContractsCall,
  PalletContractsError,
  PalletContractsEvent,
  PalletContractsSchedule,
  PalletContractsScheduleHostFnWeights,
  PalletContractsScheduleInstructionWeights,
  PalletContractsScheduleLimits,
  PalletContractsStorageContractInfo,
  PalletContractsStorageDeletedContract,
  PalletContractsWasmDeterminism,
  PalletContractsWasmOwnerInfo,
  PalletContractsWasmPrefabWasmModule,
  PalletCorporateActionsBallotBallotMeta,
  PalletCorporateActionsBallotBallotTimeRange,
  PalletCorporateActionsBallotBallotVote,
  PalletCorporateActionsBallotCall,
  PalletCorporateActionsBallotError,
  PalletCorporateActionsBallotEvent,
  PalletCorporateActionsBallotMotion,
  PalletCorporateActionsCaCheckpoint,
  PalletCorporateActionsCaId,
  PalletCorporateActionsCaKind,
  PalletCorporateActionsCall,
  PalletCorporateActionsCorporateAction,
  PalletCorporateActionsDistribution,
  PalletCorporateActionsDistributionCall,
  PalletCorporateActionsDistributionError,
  PalletCorporateActionsDistributionEvent,
  PalletCorporateActionsError,
  PalletCorporateActionsEvent,
  PalletCorporateActionsInitiateCorporateActionArgs,
  PalletCorporateActionsRecordDate,
  PalletCorporateActionsRecordDateSpec,
  PalletCorporateActionsTargetIdentities,
  PalletCorporateActionsTargetTreatment,
  PalletExternalAgentsCall,
  PalletExternalAgentsError,
  PalletGrandpaCall,
  PalletGrandpaError,
  PalletGrandpaEvent,
  PalletGrandpaStoredPendingChange,
  PalletGrandpaStoredState,
  PalletGroupCall,
  PalletGroupError,
  PalletGroupInstance1,
  PalletGroupInstance2,
  PalletGroupInstance3,
  PalletGroupInstance4,
  PalletIdentityCall,
  PalletIdentityClaim1stKey,
  PalletIdentityClaim2ndKey,
  PalletIdentityError,
  PalletImOnlineBoundedOpaqueNetworkState,
  PalletImOnlineCall,
  PalletImOnlineError,
  PalletImOnlineEvent,
  PalletImOnlineHeartbeat,
  PalletImOnlineSr25519AppSr25519Public,
  PalletImOnlineSr25519AppSr25519Signature,
  PalletIndicesCall,
  PalletIndicesError,
  PalletIndicesEvent,
  PalletMultisigCall,
  PalletMultisigError,
  PalletMultisigProposalDetails,
  PalletMultisigProposalStatus,
  PalletMultisigRawEvent,
  PalletNftCall,
  PalletNftError,
  PalletOffencesEvent,
  PalletPermissionsError,
  PalletPermissionsStoreCallMetadata,
  PalletPipsCall,
  PalletPipsCommittee,
  PalletPipsDepositInfo,
  PalletPipsError,
  PalletPipsPip,
  PalletPipsPipsMetadata,
  PalletPipsProposalData,
  PalletPipsProposalState,
  PalletPipsProposer,
  PalletPipsRawEvent,
  PalletPipsSnapshotMetadata,
  PalletPipsSnapshotResult,
  PalletPipsSnapshottedPip,
  PalletPipsVote,
  PalletPipsVotingResult,
  PalletPortfolioCall,
  PalletPortfolioError,
  PalletPortfolioMovePortfolioItem,
  PalletPreimageCall,
  PalletPreimageError,
  PalletPreimageEvent,
  PalletPreimageRequestStatus,
  PalletProtocolFeeCall,
  PalletProtocolFeeError,
  PalletProtocolFeeRawEvent,
  PalletRelayerCall,
  PalletRelayerError,
  PalletRelayerSubsidy,
  PalletRewardsCall,
  PalletRewardsError,
  PalletRewardsItnRewardStatus,
  PalletRewardsRawEvent,
  PalletSchedulerCall,
  PalletSchedulerError,
  PalletSchedulerEvent,
  PalletSchedulerScheduled,
  PalletSessionCall,
  PalletSessionError,
  PalletSessionEvent,
  PalletSettlementAffirmationStatus,
  PalletSettlementCall,
  PalletSettlementError,
  PalletSettlementInstruction,
  PalletSettlementInstructionMemo,
  PalletSettlementInstructionStatus,
  PalletSettlementLeg,
  PalletSettlementLegAsset,
  PalletSettlementLegStatus,
  PalletSettlementLegV2,
  PalletSettlementRawEvent,
  PalletSettlementReceiptDetails,
  PalletSettlementSettlementType,
  PalletSettlementVenue,
  PalletSettlementVenueType,
  PalletStakingActiveEraInfo,
  PalletStakingCall,
  PalletStakingCompactAssignments,
  PalletStakingElectionCompute,
  PalletStakingElectionResult,
  PalletStakingElectionSize,
  PalletStakingElectionStatus,
  PalletStakingEraRewardPoints,
  PalletStakingError,
  PalletStakingExposure,
  PalletStakingForcing,
  PalletStakingIndividualExposure,
  PalletStakingNominations,
  PalletStakingPermissionedIdentityPrefs,
  PalletStakingRawEvent,
  PalletStakingReleases,
  PalletStakingRewardDestination,
  PalletStakingSlashingSlashingSpans,
  PalletStakingSlashingSpanRecord,
  PalletStakingSlashingSwitch,
  PalletStakingStakingLedger,
  PalletStakingUnappliedSlash,
  PalletStakingUnlockChunk,
  PalletStakingValidatorPrefs,
  PalletStatisticsCall,
  PalletStatisticsError,
  PalletStoCall,
  PalletStoError,
  PalletStoFundraiser,
  PalletStoFundraiserStatus,
  PalletStoFundraiserTier,
  PalletStoPriceTier,
  PalletStoRawEvent,
  PalletSudoCall,
  PalletSudoError,
  PalletSudoRawEvent,
  PalletTestUtilsCall,
  PalletTestUtilsError,
  PalletTestUtilsRawEvent,
  PalletTimestampCall,
  PalletTransactionPaymentChargeTransactionPayment,
  PalletTransactionPaymentRawEvent,
  PalletTransactionPaymentReleases,
  PalletTreasuryCall,
  PalletTreasuryError,
  PalletTreasuryRawEvent,
  PalletUtilityCall,
  PalletUtilityError,
  PalletUtilityEvent,
  PalletUtilityUniqueCall,
  PolymeshCommonUtilitiesAssetRawEvent,
  PolymeshCommonUtilitiesBalancesAccountData,
  PolymeshCommonUtilitiesBalancesMemo,
  PolymeshCommonUtilitiesBalancesRawEvent,
  PolymeshCommonUtilitiesBalancesReasons,
  PolymeshCommonUtilitiesBaseEvent,
  PolymeshCommonUtilitiesCheckpointEvent,
  PolymeshCommonUtilitiesCheckpointStoredSchedule,
  PolymeshCommonUtilitiesExternalAgentsEvent,
  PolymeshCommonUtilitiesGroupInactiveMember,
  PolymeshCommonUtilitiesGroupRawEventInstance1,
  PolymeshCommonUtilitiesGroupRawEventInstance2,
  PolymeshCommonUtilitiesGroupRawEventInstance3,
  PolymeshCommonUtilitiesGroupRawEventInstance4,
  PolymeshCommonUtilitiesIdentityRawEvent,
  PolymeshCommonUtilitiesIdentitySecondaryKeyWithAuth,
  PolymeshCommonUtilitiesIdentitySecondaryKeyWithAuthV1,
  PolymeshCommonUtilitiesMaybeBlock,
  PolymeshCommonUtilitiesNftEvent,
  PolymeshCommonUtilitiesPortfolioEvent,
  PolymeshCommonUtilitiesProtocolFeeProtocolOp,
  PolymeshCommonUtilitiesRelayerRawEvent,
  PolymeshCommonUtilitiesStatisticsEvent,
  PolymeshContractsCall,
  PolymeshContractsChainExtensionExtrinsicId,
  PolymeshContractsError,
  PolymeshContractsEvent,
  PolymeshExtensionsCheckWeight,
  PolymeshPrimitivesAgentAgentGroup,
  PolymeshPrimitivesAssetAssetType,
  PolymeshPrimitivesAssetIdentifier,
  PolymeshPrimitivesAssetMetadataAssetMetadataKey,
  PolymeshPrimitivesAssetMetadataAssetMetadataLockStatus,
  PolymeshPrimitivesAssetMetadataAssetMetadataSpec,
  PolymeshPrimitivesAssetMetadataAssetMetadataValueDetail,
  PolymeshPrimitivesAssetNonFungibleType,
  PolymeshPrimitivesAuthorization,
  PolymeshPrimitivesAuthorizationAuthorizationData,
  PolymeshPrimitivesBeneficiary,
  PolymeshPrimitivesCalendarCalendarPeriod,
  PolymeshPrimitivesCalendarCalendarUnit,
  PolymeshPrimitivesCalendarCheckpointSchedule,
  PolymeshPrimitivesCddId,
  PolymeshPrimitivesCddIdInvestorUid,
  PolymeshPrimitivesComplianceManagerAssetCompliance,
  PolymeshPrimitivesComplianceManagerComplianceRequirement,
  PolymeshPrimitivesCondition,
  PolymeshPrimitivesConditionConditionType,
  PolymeshPrimitivesConditionTargetIdentity,
  PolymeshPrimitivesConditionTrustedFor,
  PolymeshPrimitivesConditionTrustedIssuer,
  PolymeshPrimitivesDocument,
  PolymeshPrimitivesDocumentHash,
  PolymeshPrimitivesEthereumEcdsaSignature,
  PolymeshPrimitivesEthereumEthereumAddress,
  PolymeshPrimitivesEventOnly,
  PolymeshPrimitivesIdentityClaim,
  PolymeshPrimitivesIdentityClaimClaim,
  PolymeshPrimitivesIdentityClaimClaimType,
  PolymeshPrimitivesIdentityClaimScope,
  PolymeshPrimitivesIdentityDidRecord,
  PolymeshPrimitivesIdentityId,
  PolymeshPrimitivesIdentityIdPortfolioId,
  PolymeshPrimitivesIdentityIdPortfolioKind,
  PolymeshPrimitivesJurisdictionCountryCode,
  PolymeshPrimitivesNftNfTs,
  PolymeshPrimitivesNftNftCollection,
  PolymeshPrimitivesNftNftCollectionKeys,
  PolymeshPrimitivesNftNftMetadataAttribute,
  PolymeshPrimitivesPortfolioFund,
  PolymeshPrimitivesPortfolioFundDescription,
  PolymeshPrimitivesPortfolioMemo,
  PolymeshPrimitivesPosRatio,
  PolymeshPrimitivesSecondaryKey,
  PolymeshPrimitivesSecondaryKeyKeyRecord,
  PolymeshPrimitivesSecondaryKeyPalletPermissions,
  PolymeshPrimitivesSecondaryKeyPermissions,
  PolymeshPrimitivesSecondaryKeySignatory,
  PolymeshPrimitivesSecondaryKeyV1SecondaryKey,
  PolymeshPrimitivesStatisticsAssetScope,
  PolymeshPrimitivesStatisticsStat1stKey,
  PolymeshPrimitivesStatisticsStat2ndKey,
  PolymeshPrimitivesStatisticsStatClaim,
  PolymeshPrimitivesStatisticsStatOpType,
  PolymeshPrimitivesStatisticsStatType,
  PolymeshPrimitivesStatisticsStatUpdate,
  PolymeshPrimitivesSubsetSubsetRestrictionDispatchableName,
  PolymeshPrimitivesSubsetSubsetRestrictionPalletPermissions,
  PolymeshPrimitivesSubsetSubsetRestrictionPortfolioId,
  PolymeshPrimitivesSubsetSubsetRestrictionTicker,
  PolymeshPrimitivesTicker,
  PolymeshPrimitivesTransferComplianceAssetTransferCompliance,
  PolymeshPrimitivesTransferComplianceTransferCondition,
  PolymeshPrimitivesTransferComplianceTransferConditionExemptKey,
  PolymeshRuntimeDevelopRuntime,
  PolymeshRuntimeDevelopRuntimeOriginCaller,
  PolymeshRuntimeDevelopRuntimeSessionKeys,
  SpAuthorityDiscoveryAppPublic,
  SpConsensusBabeAllowedSlots,
  SpConsensusBabeAppPublic,
  SpConsensusBabeBabeEpochConfiguration,
  SpConsensusBabeDigestsNextConfigDescriptor,
  SpConsensusBabeDigestsPreDigest,
  SpConsensusBabeDigestsPrimaryPreDigest,
  SpConsensusBabeDigestsSecondaryPlainPreDigest,
  SpConsensusBabeDigestsSecondaryVRFPreDigest,
  SpConsensusSlotsEquivocationProof,
  SpCoreCryptoKeyTypeId,
  SpCoreEcdsaSignature,
  SpCoreEd25519Public,
  SpCoreEd25519Signature,
  SpCoreOffchainOpaqueNetworkState,
  SpCoreSr25519Public,
  SpCoreSr25519Signature,
  SpCoreVoid,
  SpFinalityGrandpaAppPublic,
  SpFinalityGrandpaAppSignature,
  SpFinalityGrandpaEquivocation,
  SpFinalityGrandpaEquivocationProof,
  SpNposElectionsElectionScore,
  SpRuntimeArithmeticError,
  SpRuntimeBlakeTwo256,
  SpRuntimeDigest,
  SpRuntimeDigestDigestItem,
  SpRuntimeDispatchError,
  SpRuntimeHeader,
  SpRuntimeModuleError,
  SpRuntimeMultiSignature,
  SpRuntimeTokenError,
  SpRuntimeTransactionalError,
  SpSessionMembershipProof,
  SpStakingOffenceOffenceDetails,
  SpVersionRuntimeVersion,
  SpWeightsRuntimeDbWeight,
  SpWeightsWeightToFeeCoefficient,
  SpWeightsWeightV2Weight,
} from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  export interface InterfaceTypes {
    ConfidentialIdentityV2ClaimProofsScopeClaimProof: ConfidentialIdentityV2ClaimProofsScopeClaimProof;
    ConfidentialIdentityV2ClaimProofsZkProofData: ConfidentialIdentityV2ClaimProofsZkProofData;
    ConfidentialIdentityV2SignSignature: ConfidentialIdentityV2SignSignature;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPreimagesBounded: FrameSupportPreimagesBounded;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    PalletAssetAssetOwnershipRelation: PalletAssetAssetOwnershipRelation;
    PalletAssetCall: PalletAssetCall;
    PalletAssetCheckpointCall: PalletAssetCheckpointCall;
    PalletAssetCheckpointError: PalletAssetCheckpointError;
    PalletAssetCheckpointScheduleSpec: PalletAssetCheckpointScheduleSpec;
    PalletAssetClassicTickerImport: PalletAssetClassicTickerImport;
    PalletAssetClassicTickerRegistration: PalletAssetClassicTickerRegistration;
    PalletAssetError: PalletAssetError;
    PalletAssetSecurityToken: PalletAssetSecurityToken;
    PalletAssetTickerRegistration: PalletAssetTickerRegistration;
    PalletAssetTickerRegistrationConfig: PalletAssetTickerRegistrationConfig;
    PalletAuthorshipCall: PalletAuthorshipCall;
    PalletAuthorshipError: PalletAuthorshipError;
    PalletAuthorshipUncleEntryItem: PalletAuthorshipUncleEntryItem;
    PalletBabeCall: PalletBabeCall;
    PalletBabeError: PalletBabeError;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBaseCall: PalletBaseCall;
    PalletBaseError: PalletBaseError;
    PalletBridgeBridgeTx: PalletBridgeBridgeTx;
    PalletBridgeBridgeTxDetail: PalletBridgeBridgeTxDetail;
    PalletBridgeBridgeTxStatus: PalletBridgeBridgeTxStatus;
    PalletBridgeCall: PalletBridgeCall;
    PalletBridgeError: PalletBridgeError;
    PalletBridgeHandledTxStatus: PalletBridgeHandledTxStatus;
    PalletBridgeRawEvent: PalletBridgeRawEvent;
    PalletCommitteeCall: PalletCommitteeCall;
    PalletCommitteeError: PalletCommitteeError;
    PalletCommitteeInstance1: PalletCommitteeInstance1;
    PalletCommitteeInstance3: PalletCommitteeInstance3;
    PalletCommitteeInstance4: PalletCommitteeInstance4;
    PalletCommitteePolymeshVotes: PalletCommitteePolymeshVotes;
    PalletCommitteeRawEventInstance1: PalletCommitteeRawEventInstance1;
    PalletCommitteeRawEventInstance3: PalletCommitteeRawEventInstance3;
    PalletCommitteeRawEventInstance4: PalletCommitteeRawEventInstance4;
    PalletCommitteeRawOriginInstance1: PalletCommitteeRawOriginInstance1;
    PalletCommitteeRawOriginInstance3: PalletCommitteeRawOriginInstance3;
    PalletCommitteeRawOriginInstance4: PalletCommitteeRawOriginInstance4;
    PalletComplianceManagerCall: PalletComplianceManagerCall;
    PalletComplianceManagerError: PalletComplianceManagerError;
    PalletComplianceManagerEvent: PalletComplianceManagerEvent;
    PalletContractsCall: PalletContractsCall;
    PalletContractsError: PalletContractsError;
    PalletContractsEvent: PalletContractsEvent;
    PalletContractsSchedule: PalletContractsSchedule;
    PalletContractsScheduleHostFnWeights: PalletContractsScheduleHostFnWeights;
    PalletContractsScheduleInstructionWeights: PalletContractsScheduleInstructionWeights;
    PalletContractsScheduleLimits: PalletContractsScheduleLimits;
    PalletContractsStorageContractInfo: PalletContractsStorageContractInfo;
    PalletContractsStorageDeletedContract: PalletContractsStorageDeletedContract;
    PalletContractsWasmDeterminism: PalletContractsWasmDeterminism;
    PalletContractsWasmOwnerInfo: PalletContractsWasmOwnerInfo;
    PalletContractsWasmPrefabWasmModule: PalletContractsWasmPrefabWasmModule;
    PalletCorporateActionsBallotBallotMeta: PalletCorporateActionsBallotBallotMeta;
    PalletCorporateActionsBallotBallotTimeRange: PalletCorporateActionsBallotBallotTimeRange;
    PalletCorporateActionsBallotBallotVote: PalletCorporateActionsBallotBallotVote;
    PalletCorporateActionsBallotCall: PalletCorporateActionsBallotCall;
    PalletCorporateActionsBallotError: PalletCorporateActionsBallotError;
    PalletCorporateActionsBallotEvent: PalletCorporateActionsBallotEvent;
    PalletCorporateActionsBallotMotion: PalletCorporateActionsBallotMotion;
    PalletCorporateActionsCaCheckpoint: PalletCorporateActionsCaCheckpoint;
    PalletCorporateActionsCaId: PalletCorporateActionsCaId;
    PalletCorporateActionsCaKind: PalletCorporateActionsCaKind;
    PalletCorporateActionsCall: PalletCorporateActionsCall;
    PalletCorporateActionsCorporateAction: PalletCorporateActionsCorporateAction;
    PalletCorporateActionsDistribution: PalletCorporateActionsDistribution;
    PalletCorporateActionsDistributionCall: PalletCorporateActionsDistributionCall;
    PalletCorporateActionsDistributionError: PalletCorporateActionsDistributionError;
    PalletCorporateActionsDistributionEvent: PalletCorporateActionsDistributionEvent;
    PalletCorporateActionsError: PalletCorporateActionsError;
    PalletCorporateActionsEvent: PalletCorporateActionsEvent;
    PalletCorporateActionsInitiateCorporateActionArgs: PalletCorporateActionsInitiateCorporateActionArgs;
    PalletCorporateActionsRecordDate: PalletCorporateActionsRecordDate;
    PalletCorporateActionsRecordDateSpec: PalletCorporateActionsRecordDateSpec;
    PalletCorporateActionsTargetIdentities: PalletCorporateActionsTargetIdentities;
    PalletCorporateActionsTargetTreatment: PalletCorporateActionsTargetTreatment;
    PalletExternalAgentsCall: PalletExternalAgentsCall;
    PalletExternalAgentsError: PalletExternalAgentsError;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletGroupCall: PalletGroupCall;
    PalletGroupError: PalletGroupError;
    PalletGroupInstance1: PalletGroupInstance1;
    PalletGroupInstance2: PalletGroupInstance2;
    PalletGroupInstance3: PalletGroupInstance3;
    PalletGroupInstance4: PalletGroupInstance4;
    PalletIdentityCall: PalletIdentityCall;
    PalletIdentityClaim1stKey: PalletIdentityClaim1stKey;
    PalletIdentityClaim2ndKey: PalletIdentityClaim2ndKey;
    PalletIdentityError: PalletIdentityError;
    PalletImOnlineBoundedOpaqueNetworkState: PalletImOnlineBoundedOpaqueNetworkState;
    PalletImOnlineCall: PalletImOnlineCall;
    PalletImOnlineError: PalletImOnlineError;
    PalletImOnlineEvent: PalletImOnlineEvent;
    PalletImOnlineHeartbeat: PalletImOnlineHeartbeat;
    PalletImOnlineSr25519AppSr25519Public: PalletImOnlineSr25519AppSr25519Public;
    PalletImOnlineSr25519AppSr25519Signature: PalletImOnlineSr25519AppSr25519Signature;
    PalletIndicesCall: PalletIndicesCall;
    PalletIndicesError: PalletIndicesError;
    PalletIndicesEvent: PalletIndicesEvent;
    PalletMultisigCall: PalletMultisigCall;
    PalletMultisigError: PalletMultisigError;
    PalletMultisigProposalDetails: PalletMultisigProposalDetails;
    PalletMultisigProposalStatus: PalletMultisigProposalStatus;
    PalletMultisigRawEvent: PalletMultisigRawEvent;
    PalletNftCall: PalletNftCall;
    PalletNftError: PalletNftError;
    PalletOffencesEvent: PalletOffencesEvent;
    PalletPermissionsError: PalletPermissionsError;
    PalletPermissionsStoreCallMetadata: PalletPermissionsStoreCallMetadata;
    PalletPipsCall: PalletPipsCall;
    PalletPipsCommittee: PalletPipsCommittee;
    PalletPipsDepositInfo: PalletPipsDepositInfo;
    PalletPipsError: PalletPipsError;
    PalletPipsPip: PalletPipsPip;
    PalletPipsPipsMetadata: PalletPipsPipsMetadata;
    PalletPipsProposalData: PalletPipsProposalData;
    PalletPipsProposalState: PalletPipsProposalState;
    PalletPipsProposer: PalletPipsProposer;
    PalletPipsRawEvent: PalletPipsRawEvent;
    PalletPipsSnapshotMetadata: PalletPipsSnapshotMetadata;
    PalletPipsSnapshotResult: PalletPipsSnapshotResult;
    PalletPipsSnapshottedPip: PalletPipsSnapshottedPip;
    PalletPipsVote: PalletPipsVote;
    PalletPipsVotingResult: PalletPipsVotingResult;
    PalletPortfolioCall: PalletPortfolioCall;
    PalletPortfolioError: PalletPortfolioError;
    PalletPortfolioMovePortfolioItem: PalletPortfolioMovePortfolioItem;
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletProtocolFeeCall: PalletProtocolFeeCall;
    PalletProtocolFeeError: PalletProtocolFeeError;
    PalletProtocolFeeRawEvent: PalletProtocolFeeRawEvent;
    PalletRelayerCall: PalletRelayerCall;
    PalletRelayerError: PalletRelayerError;
    PalletRelayerSubsidy: PalletRelayerSubsidy;
    PalletRewardsCall: PalletRewardsCall;
    PalletRewardsError: PalletRewardsError;
    PalletRewardsItnRewardStatus: PalletRewardsItnRewardStatus;
    PalletRewardsRawEvent: PalletRewardsRawEvent;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduled: PalletSchedulerScheduled;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletSettlementAffirmationStatus: PalletSettlementAffirmationStatus;
    PalletSettlementCall: PalletSettlementCall;
    PalletSettlementError: PalletSettlementError;
    PalletSettlementInstruction: PalletSettlementInstruction;
    PalletSettlementInstructionMemo: PalletSettlementInstructionMemo;
    PalletSettlementInstructionStatus: PalletSettlementInstructionStatus;
    PalletSettlementLeg: PalletSettlementLeg;
    PalletSettlementLegAsset: PalletSettlementLegAsset;
    PalletSettlementLegStatus: PalletSettlementLegStatus;
    PalletSettlementLegV2: PalletSettlementLegV2;
    PalletSettlementRawEvent: PalletSettlementRawEvent;
    PalletSettlementReceiptDetails: PalletSettlementReceiptDetails;
    PalletSettlementSettlementType: PalletSettlementSettlementType;
    PalletSettlementVenue: PalletSettlementVenue;
    PalletSettlementVenueType: PalletSettlementVenueType;
    PalletStakingActiveEraInfo: PalletStakingActiveEraInfo;
    PalletStakingCall: PalletStakingCall;
    PalletStakingCompactAssignments: PalletStakingCompactAssignments;
    PalletStakingElectionCompute: PalletStakingElectionCompute;
    PalletStakingElectionResult: PalletStakingElectionResult;
    PalletStakingElectionSize: PalletStakingElectionSize;
    PalletStakingElectionStatus: PalletStakingElectionStatus;
    PalletStakingEraRewardPoints: PalletStakingEraRewardPoints;
    PalletStakingError: PalletStakingError;
    PalletStakingExposure: PalletStakingExposure;
    PalletStakingForcing: PalletStakingForcing;
    PalletStakingIndividualExposure: PalletStakingIndividualExposure;
    PalletStakingNominations: PalletStakingNominations;
    PalletStakingPermissionedIdentityPrefs: PalletStakingPermissionedIdentityPrefs;
    PalletStakingRawEvent: PalletStakingRawEvent;
    PalletStakingReleases: PalletStakingReleases;
    PalletStakingRewardDestination: PalletStakingRewardDestination;
    PalletStakingSlashingSlashingSpans: PalletStakingSlashingSlashingSpans;
    PalletStakingSlashingSpanRecord: PalletStakingSlashingSpanRecord;
    PalletStakingSlashingSwitch: PalletStakingSlashingSwitch;
    PalletStakingStakingLedger: PalletStakingStakingLedger;
    PalletStakingUnappliedSlash: PalletStakingUnappliedSlash;
    PalletStakingUnlockChunk: PalletStakingUnlockChunk;
    PalletStakingValidatorPrefs: PalletStakingValidatorPrefs;
    PalletStatisticsCall: PalletStatisticsCall;
    PalletStatisticsError: PalletStatisticsError;
    PalletStoCall: PalletStoCall;
    PalletStoError: PalletStoError;
    PalletStoFundraiser: PalletStoFundraiser;
    PalletStoFundraiserStatus: PalletStoFundraiserStatus;
    PalletStoFundraiserTier: PalletStoFundraiserTier;
    PalletStoPriceTier: PalletStoPriceTier;
    PalletStoRawEvent: PalletStoRawEvent;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoRawEvent: PalletSudoRawEvent;
    PalletTestUtilsCall: PalletTestUtilsCall;
    PalletTestUtilsError: PalletTestUtilsError;
    PalletTestUtilsRawEvent: PalletTestUtilsRawEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentRawEvent: PalletTransactionPaymentRawEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletTreasuryCall: PalletTreasuryCall;
    PalletTreasuryError: PalletTreasuryError;
    PalletTreasuryRawEvent: PalletTreasuryRawEvent;
    PalletUtilityCall: PalletUtilityCall;
    PalletUtilityError: PalletUtilityError;
    PalletUtilityEvent: PalletUtilityEvent;
    PalletUtilityUniqueCall: PalletUtilityUniqueCall;
    PolymeshCommonUtilitiesAssetRawEvent: PolymeshCommonUtilitiesAssetRawEvent;
    PolymeshCommonUtilitiesBalancesAccountData: PolymeshCommonUtilitiesBalancesAccountData;
    PolymeshCommonUtilitiesBalancesMemo: PolymeshCommonUtilitiesBalancesMemo;
    PolymeshCommonUtilitiesBalancesRawEvent: PolymeshCommonUtilitiesBalancesRawEvent;
    PolymeshCommonUtilitiesBalancesReasons: PolymeshCommonUtilitiesBalancesReasons;
    PolymeshCommonUtilitiesBaseEvent: PolymeshCommonUtilitiesBaseEvent;
    PolymeshCommonUtilitiesCheckpointEvent: PolymeshCommonUtilitiesCheckpointEvent;
    PolymeshCommonUtilitiesCheckpointStoredSchedule: PolymeshCommonUtilitiesCheckpointStoredSchedule;
    PolymeshCommonUtilitiesExternalAgentsEvent: PolymeshCommonUtilitiesExternalAgentsEvent;
    PolymeshCommonUtilitiesGroupInactiveMember: PolymeshCommonUtilitiesGroupInactiveMember;
    PolymeshCommonUtilitiesGroupRawEventInstance1: PolymeshCommonUtilitiesGroupRawEventInstance1;
    PolymeshCommonUtilitiesGroupRawEventInstance2: PolymeshCommonUtilitiesGroupRawEventInstance2;
    PolymeshCommonUtilitiesGroupRawEventInstance3: PolymeshCommonUtilitiesGroupRawEventInstance3;
    PolymeshCommonUtilitiesGroupRawEventInstance4: PolymeshCommonUtilitiesGroupRawEventInstance4;
    PolymeshCommonUtilitiesIdentityRawEvent: PolymeshCommonUtilitiesIdentityRawEvent;
    PolymeshCommonUtilitiesIdentitySecondaryKeyWithAuth: PolymeshCommonUtilitiesIdentitySecondaryKeyWithAuth;
    PolymeshCommonUtilitiesIdentitySecondaryKeyWithAuthV1: PolymeshCommonUtilitiesIdentitySecondaryKeyWithAuthV1;
    PolymeshCommonUtilitiesMaybeBlock: PolymeshCommonUtilitiesMaybeBlock;
    PolymeshCommonUtilitiesNftEvent: PolymeshCommonUtilitiesNftEvent;
    PolymeshCommonUtilitiesPortfolioEvent: PolymeshCommonUtilitiesPortfolioEvent;
    PolymeshCommonUtilitiesProtocolFeeProtocolOp: PolymeshCommonUtilitiesProtocolFeeProtocolOp;
    PolymeshCommonUtilitiesRelayerRawEvent: PolymeshCommonUtilitiesRelayerRawEvent;
    PolymeshCommonUtilitiesStatisticsEvent: PolymeshCommonUtilitiesStatisticsEvent;
    PolymeshContractsCall: PolymeshContractsCall;
    PolymeshContractsChainExtensionExtrinsicId: PolymeshContractsChainExtensionExtrinsicId;
    PolymeshContractsError: PolymeshContractsError;
    PolymeshContractsEvent: PolymeshContractsEvent;
    PolymeshExtensionsCheckWeight: PolymeshExtensionsCheckWeight;
    PolymeshPrimitivesAgentAgentGroup: PolymeshPrimitivesAgentAgentGroup;
    PolymeshPrimitivesAssetAssetType: PolymeshPrimitivesAssetAssetType;
    PolymeshPrimitivesAssetIdentifier: PolymeshPrimitivesAssetIdentifier;
    PolymeshPrimitivesAssetMetadataAssetMetadataKey: PolymeshPrimitivesAssetMetadataAssetMetadataKey;
    PolymeshPrimitivesAssetMetadataAssetMetadataLockStatus: PolymeshPrimitivesAssetMetadataAssetMetadataLockStatus;
    PolymeshPrimitivesAssetMetadataAssetMetadataSpec: PolymeshPrimitivesAssetMetadataAssetMetadataSpec;
    PolymeshPrimitivesAssetMetadataAssetMetadataValueDetail: PolymeshPrimitivesAssetMetadataAssetMetadataValueDetail;
    PolymeshPrimitivesAssetNonFungibleType: PolymeshPrimitivesAssetNonFungibleType;
    PolymeshPrimitivesAuthorization: PolymeshPrimitivesAuthorization;
    PolymeshPrimitivesAuthorizationAuthorizationData: PolymeshPrimitivesAuthorizationAuthorizationData;
    PolymeshPrimitivesBeneficiary: PolymeshPrimitivesBeneficiary;
    PolymeshPrimitivesCalendarCalendarPeriod: PolymeshPrimitivesCalendarCalendarPeriod;
    PolymeshPrimitivesCalendarCalendarUnit: PolymeshPrimitivesCalendarCalendarUnit;
    PolymeshPrimitivesCalendarCheckpointSchedule: PolymeshPrimitivesCalendarCheckpointSchedule;
    PolymeshPrimitivesCddId: PolymeshPrimitivesCddId;
    PolymeshPrimitivesCddIdInvestorUid: PolymeshPrimitivesCddIdInvestorUid;
    PolymeshPrimitivesComplianceManagerAssetCompliance: PolymeshPrimitivesComplianceManagerAssetCompliance;
    PolymeshPrimitivesComplianceManagerComplianceRequirement: PolymeshPrimitivesComplianceManagerComplianceRequirement;
    PolymeshPrimitivesCondition: PolymeshPrimitivesCondition;
    PolymeshPrimitivesConditionConditionType: PolymeshPrimitivesConditionConditionType;
    PolymeshPrimitivesConditionTargetIdentity: PolymeshPrimitivesConditionTargetIdentity;
    PolymeshPrimitivesConditionTrustedFor: PolymeshPrimitivesConditionTrustedFor;
    PolymeshPrimitivesConditionTrustedIssuer: PolymeshPrimitivesConditionTrustedIssuer;
    PolymeshPrimitivesDocument: PolymeshPrimitivesDocument;
    PolymeshPrimitivesDocumentHash: PolymeshPrimitivesDocumentHash;
    PolymeshPrimitivesEthereumEcdsaSignature: PolymeshPrimitivesEthereumEcdsaSignature;
    PolymeshPrimitivesEthereumEthereumAddress: PolymeshPrimitivesEthereumEthereumAddress;
    PolymeshPrimitivesEventOnly: PolymeshPrimitivesEventOnly;
    PolymeshPrimitivesIdentityClaim: PolymeshPrimitivesIdentityClaim;
    PolymeshPrimitivesIdentityClaimClaim: PolymeshPrimitivesIdentityClaimClaim;
    PolymeshPrimitivesIdentityClaimClaimType: PolymeshPrimitivesIdentityClaimClaimType;
    PolymeshPrimitivesIdentityClaimScope: PolymeshPrimitivesIdentityClaimScope;
    PolymeshPrimitivesIdentityDidRecord: PolymeshPrimitivesIdentityDidRecord;
    PolymeshPrimitivesIdentityId: PolymeshPrimitivesIdentityId;
    PolymeshPrimitivesIdentityIdPortfolioId: PolymeshPrimitivesIdentityIdPortfolioId;
    PolymeshPrimitivesIdentityIdPortfolioKind: PolymeshPrimitivesIdentityIdPortfolioKind;
    PolymeshPrimitivesJurisdictionCountryCode: PolymeshPrimitivesJurisdictionCountryCode;
    PolymeshPrimitivesNftNfTs: PolymeshPrimitivesNftNfTs;
    PolymeshPrimitivesNftNftCollection: PolymeshPrimitivesNftNftCollection;
    PolymeshPrimitivesNftNftCollectionKeys: PolymeshPrimitivesNftNftCollectionKeys;
    PolymeshPrimitivesNftNftMetadataAttribute: PolymeshPrimitivesNftNftMetadataAttribute;
    PolymeshPrimitivesPortfolioFund: PolymeshPrimitivesPortfolioFund;
    PolymeshPrimitivesPortfolioFundDescription: PolymeshPrimitivesPortfolioFundDescription;
    PolymeshPrimitivesPortfolioMemo: PolymeshPrimitivesPortfolioMemo;
    PolymeshPrimitivesPosRatio: PolymeshPrimitivesPosRatio;
    PolymeshPrimitivesSecondaryKey: PolymeshPrimitivesSecondaryKey;
    PolymeshPrimitivesSecondaryKeyKeyRecord: PolymeshPrimitivesSecondaryKeyKeyRecord;
    PolymeshPrimitivesSecondaryKeyPalletPermissions: PolymeshPrimitivesSecondaryKeyPalletPermissions;
    PolymeshPrimitivesSecondaryKeyPermissions: PolymeshPrimitivesSecondaryKeyPermissions;
    PolymeshPrimitivesSecondaryKeySignatory: PolymeshPrimitivesSecondaryKeySignatory;
    PolymeshPrimitivesSecondaryKeyV1SecondaryKey: PolymeshPrimitivesSecondaryKeyV1SecondaryKey;
    PolymeshPrimitivesStatisticsAssetScope: PolymeshPrimitivesStatisticsAssetScope;
    PolymeshPrimitivesStatisticsStat1stKey: PolymeshPrimitivesStatisticsStat1stKey;
    PolymeshPrimitivesStatisticsStat2ndKey: PolymeshPrimitivesStatisticsStat2ndKey;
    PolymeshPrimitivesStatisticsStatClaim: PolymeshPrimitivesStatisticsStatClaim;
    PolymeshPrimitivesStatisticsStatOpType: PolymeshPrimitivesStatisticsStatOpType;
    PolymeshPrimitivesStatisticsStatType: PolymeshPrimitivesStatisticsStatType;
    PolymeshPrimitivesStatisticsStatUpdate: PolymeshPrimitivesStatisticsStatUpdate;
    PolymeshPrimitivesSubsetSubsetRestrictionDispatchableName: PolymeshPrimitivesSubsetSubsetRestrictionDispatchableName;
    PolymeshPrimitivesSubsetSubsetRestrictionPalletPermissions: PolymeshPrimitivesSubsetSubsetRestrictionPalletPermissions;
    PolymeshPrimitivesSubsetSubsetRestrictionPortfolioId: PolymeshPrimitivesSubsetSubsetRestrictionPortfolioId;
    PolymeshPrimitivesSubsetSubsetRestrictionTicker: PolymeshPrimitivesSubsetSubsetRestrictionTicker;
    PolymeshPrimitivesTicker: PolymeshPrimitivesTicker;
    PolymeshPrimitivesTransferComplianceAssetTransferCompliance: PolymeshPrimitivesTransferComplianceAssetTransferCompliance;
    PolymeshPrimitivesTransferComplianceTransferCondition: PolymeshPrimitivesTransferComplianceTransferCondition;
    PolymeshPrimitivesTransferComplianceTransferConditionExemptKey: PolymeshPrimitivesTransferComplianceTransferConditionExemptKey;
    PolymeshRuntimeDevelopRuntime: PolymeshRuntimeDevelopRuntime;
    PolymeshRuntimeDevelopRuntimeOriginCaller: PolymeshRuntimeDevelopRuntimeOriginCaller;
    PolymeshRuntimeDevelopRuntimeSessionKeys: PolymeshRuntimeDevelopRuntimeSessionKeys;
    SpAuthorityDiscoveryAppPublic: SpAuthorityDiscoveryAppPublic;
    SpConsensusBabeAllowedSlots: SpConsensusBabeAllowedSlots;
    SpConsensusBabeAppPublic: SpConsensusBabeAppPublic;
    SpConsensusBabeBabeEpochConfiguration: SpConsensusBabeBabeEpochConfiguration;
    SpConsensusBabeDigestsNextConfigDescriptor: SpConsensusBabeDigestsNextConfigDescriptor;
    SpConsensusBabeDigestsPreDigest: SpConsensusBabeDigestsPreDigest;
    SpConsensusBabeDigestsPrimaryPreDigest: SpConsensusBabeDigestsPrimaryPreDigest;
    SpConsensusBabeDigestsSecondaryPlainPreDigest: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    SpConsensusBabeDigestsSecondaryVRFPreDigest: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    SpConsensusSlotsEquivocationProof: SpConsensusSlotsEquivocationProof;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreOffchainOpaqueNetworkState: SpCoreOffchainOpaqueNetworkState;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpFinalityGrandpaAppPublic: SpFinalityGrandpaAppPublic;
    SpFinalityGrandpaAppSignature: SpFinalityGrandpaAppSignature;
    SpFinalityGrandpaEquivocation: SpFinalityGrandpaEquivocation;
    SpFinalityGrandpaEquivocationProof: SpFinalityGrandpaEquivocationProof;
    SpNposElectionsElectionScore: SpNposElectionsElectionScore;
    SpRuntimeArithmeticError: SpRuntimeArithmeticError;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeHeader: SpRuntimeHeader;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpSessionMembershipProof: SpSessionMembershipProof;
    SpStakingOffenceOffenceDetails: SpStakingOffenceOffenceDetails;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SpWeightsWeightToFeeCoefficient: SpWeightsWeightToFeeCoefficient;
    SpWeightsWeightV2Weight: SpWeightsWeightV2Weight;
  } // InterfaceTypes
} // declare module
