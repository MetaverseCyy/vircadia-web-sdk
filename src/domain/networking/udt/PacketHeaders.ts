//
//  PacketHeaders.ts
//
//  Created by David Rowe on 7 Jun 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

import assert from "../../shared/assert";


/*@devdoc
 *  {@link PacketType(1)|Packet types}, <code>Unknown</code>, <code>StunResponse</code>, <code>...</code>, are represented as
 *  unsigned 8-bit numbers in the protocol packets.
 *  @typedef {number} PacketType
 */
// Could just define `type PacketTypeValue = number` however using an object improves type safety.
enum PacketTypeValue {
    Unknown,                            // 0
    StunResponse,
    DomainList,
    Ping,
    PingReply,
    KillAvatar,
    AvatarData,
    InjectAudio,
    MixedAudio,
    MicrophoneAudioNoEcho,
    MicrophoneAudioWithEcho,            // 10
    BulkAvatarData,
    SilentAudioFrame,
    DomainListRequest,
    RequestAssignment,
    CreateAssignment,
    DomainConnectionDenied,
    MuteEnvironment,
    AudioStreamStats,
    DomainServerPathQuery,
    DomainServerPathResponse,           // 20
    DomainServerAddedNode,
    ICEServerPeerInformation,
    ICEServerQuery,
    OctreeStats,
    SetAvatarTraits,
    InjectorGainSet,
    AssignmentClientStatus,
    NoisyMute,
    AvatarIdentity,
    NodeIgnoreRequest,                  // 30
    DomainConnectRequest,
    DomainServerRequireDTLS,
    NodeJsonStats,
    OctreeDataNack,
    StopNode,
    AudioEnvironment,
    EntityEditNack,
    ICEServerHeartbeat,
    ICEPing,
    ICEPingReply,                       // 40
    EntityData,
    EntityQuery,
    EntityAdd,
    EntityErase,
    EntityEdit,
    DomainServerConnectionToken,
    DomainSettingsRequest,
    DomainSettings,
    AssetGet,
    AssetGetReply,                      // 50
    AssetUpload,
    AssetUploadReply,
    AssetGetInfo,
    AssetGetInfoReply,
    DomainDisconnectRequest,
    DomainServerRemovedNode,
    MessagesData,
    MessagesSubscribe,
    MessagesUnsubscribe,
    ICEServerHeartbeatDenied,           // 60
    AssetMappingOperation,
    AssetMappingOperationReply,
    ICEServerHeartbeatACK,
    NegotiateAudioFormat,
    SelectedAudioFormat,
    MoreEntityShapes,
    NodeKickRequest,
    NodeMuteRequest,
    RadiusIgnoreRequest,
    UsernameFromIDRequest,              // 70
    UsernameFromIDReply,
    AvatarQuery,
    RequestsDomainListData,
    PerAvatarGainSet,
    EntityScriptGetStatus,
    EntityScriptGetStatusReply,
    ReloadEntityServerScript,
    EntityPhysics,
    EntityServerScriptLog,
    AdjustAvatarSorting,                // 80
    OctreeFileReplacement,
    CollisionEventChanges,
    ReplicatedMicrophoneAudioNoEcho,
    ReplicatedMicrophoneAudioWithEcho,
    ReplicatedInjectAudio,
    ReplicatedSilentAudioFrame,
    ReplicatedAvatarIdentity,
    ReplicatedKillAvatar,
    ReplicatedBulkAvatarData,
    DomainContentReplacementFromUrl,    // 90
    ChallengeOwnership,
    EntityScriptCallMethod,
    ChallengeOwnershipRequest,
    ChallengeOwnershipReply,
    OctreeDataFileRequest,
    OctreeDataFileReply,
    OctreeDataPersist,
    EntityClone,
    EntityQueryInitialResultsComplete,
    BulkAvatarTraits,                   // 100
    AudioSoloRequest,
    BulkAvatarTraitsAck,
    StopInjector,
    AvatarZonePresence,

    NUM_PACKETS
}


/*@devdoc
 *  The <code>PacketType</code> namespace lists the Vircadia protocol packets.
 *  <p>C++: <code>PacketHeaders.h</code>
 *
 *  @namespace PacketType
 *  @variation 1
 *  @property {PacketType} Unknown - <code>0</code>
 *  @property {PacketType} StunResponse - <code>1</code>
 *  @property {PacketType} DomainList - <code>2</code> - The Domain Server sends this to the user client in response to a
 *      DomainConnectRequest or DomainListRequest packet, if the client is authorized to connect to the domain.<br />
 *      {@link PacketScribe.DomainListDetails}.
 *  @property {PacketType} Ping - <code>3</code>
 *  @property {PacketType} PingReply - <code>4</code>
 *  @property {PacketType} KillAvatar - <code>5</code>
 *  @property {PacketType} AvatarData - <code>6</code>
 *  @property {PacketType} InjectAudio - <code>7</code>
 *  @property {PacketType} MixedAudio - <code>8</code>
 *  @property {PacketType} MicrophoneAudioNoEcho - <code>9</code>
 *  @property {PacketType} MicrophoneAudioWithEcho - <code>10</code>
 *  @property {PacketType} BulkAvatarData - <code>11</code>
 *  @property {PacketType} SilentAudioFrame - <code>12</code>
 *  @property {PacketType} DomainListRequest - <code>13</code> - The user client periodically sends this to the Domain Server
 *      to maintain connection to the domain. The Domain Server responds with a DomainList or DomainConnectionDenied
 *      packet.<br />
 *      {@link PacketScribe.DomainListRequestDetails}.
 *  @property {PacketType} RequestAssignment - <code>14</code>
 *  @property {PacketType} CreateAssignment - <code>15</code>
 *  @property {PacketType} DomainConnectionDenied - <code>16</code> - The Domain Server sends this to the user client in
 *      response to a DomainConnectRequest or DomainListRequest packet, if the client is not authorized to connect to the
 *      domain.
 *      {@link PacketScribe.DomainConnectionDeniedDetails}.
 *  @property {PacketType} MuteEnvironment - <code>17</code>
 *  @property {PacketType} AudioStreamStats - <code>18</code>
 *  @property {PacketType} DomainServerPathQuery - <code>19</code>
 *  @property {PacketType} DomainServerPathResponse - <code>20</code>
 *  @property {PacketType} DomainServerAddedNode - <code>21</code>
 *  @property {PacketType} ICEServerPeerInformation - <code>22</code>
 *  @property {PacketType} ICEServerQuery - <code>23</code>
 *  @property {PacketType} OctreeStats - <code>24</code>
 *  @property {PacketType} SetAvatarTraits - <code>25</code>
 *  @property {PacketType} InjectorGainSet - <code>26</code>
 *  @property {PacketType} AssignmentClientStatus - <code>27</code>
 *  @property {PacketType} NoisyMute - <code>28</code>
 *  @property {PacketType} AvatarIdentity - <code>29</code>
 *  @property {PacketType} NodeIgnoreRequest - <code>30</code>
 *  @property {PacketType} DomainConnectRequest - <code>31</code> - The user client sends this to the Domain Server to initiate
 *      connection to the domain. The Domain Server responds with a DomainList or DomainConnectionDenied packet.<br />
 *      {@link PacketScribe.DomainConnectRequestDetails}.
 *  @property {PacketType} DomainServerRequireDTLS - <code>32</code>
 *  @property {PacketType} NodeJsonStats - <code>33</code>
 *  @property {PacketType} OctreeDataNack - <code>34</code>
 *  @property {PacketType} StopNode - <code>35</code>
 *  @property {PacketType} AudioEnvironment - <code>36</code>
 *  @property {PacketType} EntityEditNack - <code>37</code>
 *  @property {PacketType} ICEServerHeartbeat - <code>38</code>
 *  @property {PacketType} ICEPing - <code>39</code>
 *  @property {PacketType} ICEPingReply - <code>40</code>
 *  @property {PacketType} EntityData - <code>41</code>
 *  @property {PacketType} EntityQuery - <code>42</code>
 *  @property {PacketType} EntityAdd - <code>43</code>
 *  @property {PacketType} EntityErase - <code>44</code>
 *  @property {PacketType} EntityEdit - <code>45</code>
 *  @property {PacketType} DomainServerConnectionToken - <code>46</code>
 *  @property {PacketType} DomainSettingsRequest - <code>47</code>
 *  @property {PacketType} DomainSettings - <code>48</code>
 *  @property {PacketType} AssetGet - <code>49</code>
 *  @property {PacketType} AssetGetReply - <code>50</code>
 *  @property {PacketType} AssetUpload - <code>51</code>
 *  @property {PacketType} AssetUploadReply - <code>52</code>
 *  @property {PacketType} AssetGetInfo - <code>53</code>
 *  @property {PacketType} AssetGetInfoReply - <code>54</code>
 *  @property {PacketType} DomainDisconnectRequest - <code>55</code> - The user client sends this empty packet to the Domain
 *      Server to signal that the user client is disconnecting. The Domain Server does not respond.
 *  @property {PacketType} DomainServerRemovedNode - <code>56</code>
 *  @property {PacketType} MessagesData - <code>57</code>
 *  @property {PacketType} MessagesSubscribe - <code>58</code>
 *  @property {PacketType} MessagesUnsubscribe - <code>59</code>
 *  @property {PacketType} ICEServerHeartbeatDenied - <code>60</code>
 *  @property {PacketType} AssetMappingOperation - <code>61</code>
 *  @property {PacketType} AssetMappingOperationReply - <code>62</code>
 *  @property {PacketType} ICEServerHeartbeatACK - <code>63</code>
 *  @property {PacketType} NegotiateAudioFormat - <code>64</code>
 *  @property {PacketType} SelectedAudioFormat - <code>65</code>
 *  @property {PacketType} MoreEntityShapes - <code>66</code>
 *  @property {PacketType} NodeKickRequest - <code>67</code>
 *  @property {PacketType} NodeMuteRequest - <code>68</code>
 *  @property {PacketType} RadiusIgnoreRequest - <code>69</code>
 *  @property {PacketType} UsernameFromIDRequest - <code>70</code>
 *  @property {PacketType} UsernameFromIDReply - <code>71</code>
 *  @property {PacketType} AvatarQuery - <code>72</code>
 *  @property {PacketType} RequestsDomainListData - <code>73</code>
 *  @property {PacketType} PerAvatarGainSet - <code>74</code>
 *  @property {PacketType} EntityScriptGetStatus - <code>75</code>
 *  @property {PacketType} EntityScriptGetStatusReply - <code>76</code>
 *  @property {PacketType} ReloadEntityServerScript - <code>77</code>
 *  @property {PacketType} EntityPhysics - <code>78</code>
 *  @property {PacketType} EntityServerScriptLog - <code>79</code>
 *  @property {PacketType} AdjustAvatarSorting - <code>80</code>
 *  @property {PacketType} OctreeFileReplacement - <code>81</code>
 *  @property {PacketType} CollisionEventChanges - <code>82</code>
 *  @property {PacketType} ReplicatedMicrophoneAudioNoEcho - <code>83</code>
 *  @property {PacketType} ReplicatedMicrophoneAudioWithEcho - <code>84</code>
 *  @property {PacketType} ReplicatedInjectAudio - <code>85</code>
 *  @property {PacketType} ReplicatedSilentAudioFrame - <code>86</code>
 *  @property {PacketType} ReplicatedAvatarIdentity - <code>87</code>
 *  @property {PacketType} ReplicatedKillAvatar - <code>88</code>
 *  @property {PacketType} ReplicatedBulkAvatarData - <code>89</code>
 *  @property {PacketType} DomainContentReplacementFromUrl - <code>90</code>
 *  @property {PacketType} ChallengeOwnership - <code>91</code>
 *  @property {PacketType} EntityScriptCallMethod - <code>92</code>
 *  @property {PacketType} ChallengeOwnershipRequest - <code>93</code>
 *  @property {PacketType} ChallengeOwnershipReply - <code>94</code>
 *  @property {PacketType} OctreeDataFileRequest - <code>95</code>
 *  @property {PacketType} OctreeDataFileReply - <code>96</code>
 *  @property {PacketType} OctreeDataPersist - <code>97</code>
 *  @property {PacketType} EntityClone - <code>98</code>
 *  @property {PacketType} EntityQueryInitialResultsComplete - <code>99</code>
 *  @property {PacketType} BulkAvatarTraits - <code>100</code>
 *  @property {PacketType} AudioSoloRequest - <code>101</code>
 *  @property {PacketType} BulkAvatarTraitsAck - <code>102</code>
 *  @property {PacketType} StopInjector - <code>103</code>
 *  @property {PacketType} AvatarZonePresence - <code>104</code>
 */
const PacketType = new class {
    // C++: PacketType

    // Property values are manually added because doing so provides additional type safety compared to adding at runtime.
    readonly Unknown = PacketTypeValue.Unknown;
    readonly StunResponse = PacketTypeValue.StunResponse;
    readonly DomainList = PacketTypeValue.DomainList;
    readonly Ping = PacketTypeValue.Ping;
    readonly PingReply = PacketTypeValue.PingReply;
    readonly KillAvatar = PacketTypeValue.KillAvatar;
    readonly AvatarData = PacketTypeValue.AvatarData;
    readonly InjectAudio = PacketTypeValue.InjectAudio;
    readonly MixedAudio = PacketTypeValue.MixedAudio;
    readonly MicrophoneAudioNoEcho = PacketTypeValue.MicrophoneAudioNoEcho;
    readonly MicrophoneAudioWithEcho = PacketTypeValue.MicrophoneAudioWithEcho;
    readonly BulkAvatarData = PacketTypeValue.BulkAvatarData;
    readonly SilentAudioFrame = PacketTypeValue.SilentAudioFrame;
    readonly DomainListRequest = PacketTypeValue.DomainListRequest;
    readonly RequestAssignment = PacketTypeValue.RequestAssignment;
    readonly CreateAssignment = PacketTypeValue.CreateAssignment;
    readonly DomainConnectionDenied = PacketTypeValue.DomainConnectionDenied;
    readonly MuteEnvironment = PacketTypeValue.MuteEnvironment;
    readonly AudioStreamStats = PacketTypeValue.AudioStreamStats;
    readonly DomainServerPathQuery = PacketTypeValue.DomainServerPathQuery;
    readonly DomainServerPathResponse = PacketTypeValue.DomainServerPathResponse;
    readonly DomainServerAddedNode = PacketTypeValue.DomainServerAddedNode;
    readonly ICEServerPeerInformation = PacketTypeValue.ICEServerPeerInformation;
    readonly ICEServerQuery = PacketTypeValue.ICEServerQuery;
    readonly OctreeStats = PacketTypeValue.OctreeStats;
    readonly SetAvatarTraits = PacketTypeValue.SetAvatarTraits;
    readonly InjectorGainSet = PacketTypeValue.InjectorGainSet;
    readonly AssignmentClientStatus = PacketTypeValue.AssignmentClientStatus;
    readonly NoisyMute = PacketTypeValue.NoisyMute;
    readonly AvatarIdentity = PacketTypeValue.AvatarIdentity;
    readonly NodeIgnoreRequest = PacketTypeValue.NodeIgnoreRequest;
    readonly DomainConnectRequest = PacketTypeValue.DomainConnectRequest;
    readonly DomainServerRequireDTLS = PacketTypeValue.DomainServerRequireDTLS;
    readonly NodeJsonStats = PacketTypeValue.NodeJsonStats;
    readonly OctreeDataNack = PacketTypeValue.OctreeDataNack;
    readonly StopNode = PacketTypeValue.StopNode;
    readonly AudioEnvironment = PacketTypeValue.AudioEnvironment;
    readonly EntityEditNack = PacketTypeValue.EntityEditNack;
    readonly ICEServerHeartbeat = PacketTypeValue.ICEServerHeartbeat;
    readonly ICEPing = PacketTypeValue.ICEPing;
    readonly ICEPingReply = PacketTypeValue.ICEPingReply;
    readonly EntityData = PacketTypeValue.EntityData;
    readonly EntityQuery = PacketTypeValue.EntityQuery;
    readonly EntityAdd = PacketTypeValue.EntityAdd;
    readonly EntityErase = PacketTypeValue.EntityErase;
    readonly EntityEdit = PacketTypeValue.EntityEdit;
    readonly DomainServerConnectionToken = PacketTypeValue.DomainServerConnectionToken;
    readonly DomainSettingsRequest = PacketTypeValue.DomainSettingsRequest;
    readonly DomainSettings = PacketTypeValue.DomainSettings;
    readonly AssetGet = PacketTypeValue.AssetGet;
    readonly AssetGetReply = PacketTypeValue.AssetGetReply;
    readonly AssetUpload = PacketTypeValue.AssetUpload;
    readonly AssetUploadReply = PacketTypeValue.AssetUploadReply;
    readonly AssetGetInfo = PacketTypeValue.AssetGetInfo;
    readonly AssetGetInfoReply = PacketTypeValue.AssetGetInfoReply;
    readonly DomainDisconnectRequest = PacketTypeValue.DomainDisconnectRequest;
    readonly DomainServerRemovedNode = PacketTypeValue.DomainServerRemovedNode;
    readonly MessagesData = PacketTypeValue.MessagesData;
    readonly MessagesSubscribe = PacketTypeValue.MessagesSubscribe;
    readonly MessagesUnsubscribe = PacketTypeValue.MessagesUnsubscribe;
    readonly ICEServerHeartbeatDenied = PacketTypeValue.ICEServerHeartbeatDenied;
    readonly AssetMappingOperation = PacketTypeValue.AssetMappingOperation;
    readonly AssetMappingOperationReply = PacketTypeValue.AssetMappingOperationReply;
    readonly ICEServerHeartbeatACK = PacketTypeValue.ICEServerHeartbeatACK;
    readonly NegotiateAudioFormat = PacketTypeValue.NegotiateAudioFormat;
    readonly SelectedAudioFormat = PacketTypeValue.SelectedAudioFormat;
    readonly MoreEntityShapes = PacketTypeValue.MoreEntityShapes;
    readonly NodeKickRequest = PacketTypeValue.NodeKickRequest;
    readonly NodeMuteRequest = PacketTypeValue.NodeMuteRequest;
    readonly RadiusIgnoreRequest = PacketTypeValue.RadiusIgnoreRequest;
    readonly UsernameFromIDRequest = PacketTypeValue.UsernameFromIDRequest;
    readonly UsernameFromIDReply = PacketTypeValue.UsernameFromIDReply;
    readonly AvatarQuery = PacketTypeValue.AvatarQuery;
    readonly RequestsDomainListData = PacketTypeValue.RequestsDomainListData;
    readonly PerAvatarGainSet = PacketTypeValue.PerAvatarGainSet;
    readonly EntityScriptGetStatus = PacketTypeValue.EntityScriptGetStatus;
    readonly EntityScriptGetStatusReply = PacketTypeValue.EntityScriptGetStatusReply;
    readonly ReloadEntityServerScript = PacketTypeValue.ReloadEntityServerScript;
    readonly EntityPhysics = PacketTypeValue.EntityPhysics;
    readonly EntityServerScriptLog = PacketTypeValue.EntityServerScriptLog;
    readonly AdjustAvatarSorting = PacketTypeValue.AdjustAvatarSorting;
    readonly OctreeFileReplacement = PacketTypeValue.OctreeFileReplacement;
    readonly CollisionEventChanges = PacketTypeValue.CollisionEventChanges;
    readonly ReplicatedMicrophoneAudioNoEcho = PacketTypeValue.ReplicatedMicrophoneAudioNoEcho;
    readonly ReplicatedMicrophoneAudioWithEcho = PacketTypeValue.ReplicatedMicrophoneAudioWithEcho;
    readonly ReplicatedInjectAudio = PacketTypeValue.ReplicatedInjectAudio;
    readonly ReplicatedSilentAudioFrame = PacketTypeValue.ReplicatedSilentAudioFrame;
    readonly ReplicatedAvatarIdentity = PacketTypeValue.ReplicatedAvatarIdentity;
    readonly ReplicatedKillAvatar = PacketTypeValue.ReplicatedKillAvatar;
    readonly ReplicatedBulkAvatarData = PacketTypeValue.ReplicatedBulkAvatarData;
    readonly DomainContentReplacementFromUrl = PacketTypeValue.DomainContentReplacementFromUrl;
    readonly ChallengeOwnership = PacketTypeValue.ChallengeOwnership;
    readonly EntityScriptCallMethod = PacketTypeValue.EntityScriptCallMethod;
    readonly ChallengeOwnershipRequest = PacketTypeValue.ChallengeOwnershipRequest;
    readonly ChallengeOwnershipReply = PacketTypeValue.ChallengeOwnershipReply;
    readonly OctreeDataFileRequest = PacketTypeValue.OctreeDataFileRequest;
    readonly OctreeDataFileReply = PacketTypeValue.OctreeDataFileReply;
    readonly OctreeDataPersist = PacketTypeValue.OctreeDataPersist;
    readonly EntityClone = PacketTypeValue.EntityClone;
    readonly EntityQueryInitialResultsComplete = PacketTypeValue.EntityQueryInitialResultsComplete;
    readonly BulkAvatarTraits = PacketTypeValue.BulkAvatarTraits;
    readonly AudioSoloRequest = PacketTypeValue.AudioSoloRequest;
    readonly BulkAvatarTraitsAck = PacketTypeValue.BulkAvatarTraitsAck;
    readonly StopInjector = PacketTypeValue.StopInjector;
    readonly AvatarZonePresence = PacketTypeValue.AvatarZonePresence;

    // Packets that are sent without verifying that they are received.
    private _nonVerifiedPackets = new Set([
        PacketTypeValue.NodeJsonStats,
        PacketTypeValue.EntityQuery,
        PacketTypeValue.OctreeDataNack,
        PacketTypeValue.EntityEditNack,
        PacketTypeValue.DomainListRequest,
        PacketTypeValue.StopNode,
        PacketTypeValue.DomainDisconnectRequest,
        PacketTypeValue.UsernameFromIDRequest,
        PacketTypeValue.NodeKickRequest,
        PacketTypeValue.NodeMuteRequest
    ]);

    // Packets that don't include the local node ID of the sending node.
    private _nonSourcedPackets = new Set([
        PacketTypeValue.StunResponse,
        PacketTypeValue.CreateAssignment,
        PacketTypeValue.RequestAssignment,
        PacketTypeValue.DomainServerRequireDTLS,
        PacketTypeValue.DomainConnectRequest,
        PacketTypeValue.DomainList,
        PacketTypeValue.DomainConnectionDenied,
        PacketTypeValue.DomainServerPathQuery,
        PacketTypeValue.DomainServerPathResponse,
        PacketTypeValue.DomainServerAddedNode,
        PacketTypeValue.DomainServerConnectionToken,
        PacketTypeValue.DomainSettingsRequest,
        PacketTypeValue.OctreeDataFileRequest,
        PacketTypeValue.OctreeDataFileReply,
        PacketTypeValue.OctreeDataPersist,
        PacketTypeValue.DomainContentReplacementFromUrl,
        PacketTypeValue.DomainSettings,
        PacketTypeValue.ICEServerPeerInformation,
        PacketTypeValue.ICEServerQuery,
        PacketTypeValue.ICEServerHeartbeat,
        PacketTypeValue.ICEServerHeartbeatACK,
        PacketTypeValue.ICEPing,
        PacketTypeValue.ICEPingReply,
        PacketTypeValue.ICEServerHeartbeatDenied,
        PacketTypeValue.AssignmentClientStatus,
        PacketTypeValue.StopNode,
        PacketTypeValue.DomainServerRemovedNode,
        PacketTypeValue.UsernameFromIDReply,
        PacketTypeValue.OctreeFileReplacement,
        PacketTypeValue.ReplicatedMicrophoneAudioNoEcho,
        PacketTypeValue.ReplicatedMicrophoneAudioWithEcho,
        PacketTypeValue.ReplicatedInjectAudio,
        PacketTypeValue.ReplicatedSilentAudioFrame,
        PacketTypeValue.ReplicatedAvatarIdentity,
        PacketTypeValue.ReplicatedKillAvatar,
        PacketTypeValue.ReplicatedBulkAvatarData,
        PacketTypeValue.AvatarZonePresence
    ]);

    private _DomainListVersion = {
        // C++  DomainListVersion
        HasConnectReason: 24
    };

    private _DomainConnectionDeniedVersion = {
        // C++ DomainConnectionDeniedVersion
        IncludesExtraInfo: 19
    };

    private _DomainConnectRequestVersion = {
        // C++  DomainConnectRequestVersion
        HasCompressedSystemInfo: 26
    };


    constructor() {
        assert(PacketTypeValue.NUM_PACKETS - 1 === this.AvatarZonePresence, "Inconsistent packet data in PacketHeaders!");
    }


    /*@devdoc
     *  Gets the current version number of a packet type.
     *  @function PacketType(1).versionForPacketType
     *  @param {PacketType} packetType The packet type to get the version number of.
     *  @returns {PacketVersion} The current version number of the packet type.
     */
    /*@devdoc
     *  {@link PacketType(1)|Packet} versions are represented by unsigned 8-bit numbers in the protocol packets.
     *  @typedef {number} PacketVersion
     */
    versionForPacketType(packetType: PacketTypeValue): number {
        // C++  PacketVersion versionForPacketType(PacketType packetType)
        switch (packetType) {
            case this.DomainList:
                return this._DomainListVersion.HasConnectReason;
            case this.DomainListRequest:
                return 22;  // eslint-disable-line @typescript-eslint/no-magic-numbers
            case this.DomainConnectionDenied:
                return this._DomainConnectionDeniedVersion.IncludesExtraInfo;
            case this.DomainConnectRequest:
                return this._DomainConnectRequestVersion.HasCompressedSystemInfo;
            case this.DomainDisconnectRequest:
                return 22;  // eslint-disable-line @typescript-eslint/no-magic-numbers

                // WebRTC TODO: Add other packets.

            // C++ default for remainder of packets is 22 but we want to report packets we haven't implemented, so explicitly
            // list those packets we know about.
            default:
                console.error("ERROR - Unknown packet type in versionForPacketType() :", packetType);
        }
        return 0;
    }

    /*@devdoc
     *  Gets the Set of non-verified packets, i.e., packets which are sent without verifying that they are received.
     *  @function PacketType(1).getNonVerifiedPackets
     *  @returns {Set<PacketType>} The Set of non-verified packets.
     */
    getNonVerifiedPackets() {
        // C++  getNonSourcedPackets()
        return this._nonVerifiedPackets;
    }

    /*@devdoc
     *  Gets the Set of non-sourced packets, i.e., packets which don't include the local node ID of the sending node.
     *  @function PacketType(1).getNonSourcedPackets
     *  @returns {Set<PacketType>} The Set of non-sourced packets.
     */
    getNonSourcedPackets() {
        // C++  getNonSourcedPackets()
        return this._nonSourcedPackets;
    }

}();


/*@devdoc
 *  Gets the unique identifier for the Vircadia protocol version, combining all packet versions into a hash.
 *  @function protocolVersionsSignature
 *  @returns {Uint8Array} The 16-byte protocol version hash.
 */
function protocolVersionsSignature(): Uint8Array {
    // C++  QByteArray protocolVersionsSignature()

    // WEBRTC TODO: Retrieve value from a compile-time configuration file.

    /* eslint-disable @typescript-eslint/no-magic-numbers */
    const PROTOCOL_SIGNATURE_BYTES
        = [0x0b, 0xa2, 0x3d, 0x16, 0x33, 0x01, 0x18, 0x1b, 0x16, 0x43, 0xdd, 0x2c, 0x76, 0x7f, 0x4a, 0xc3];
    /* eslint-enable @typescript-eslint/no-magic-numbers */
    return Uint8Array.from(PROTOCOL_SIGNATURE_BYTES);
}


export { PacketType as default, PacketTypeValue, protocolVersionsSignature };
