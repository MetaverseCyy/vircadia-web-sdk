//
//  NodesList.ts
//
//  Created by David Rowe on 5 Jun 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

import AddressManager from "./AddressManager";
import DomainHandler from "./DomainHandler";
import FingerprintUtils from "./FingerprintUtils";
import LimitedNodeList from "./LimitedNodeList";
import NodeType, { NodeTypeValue } from "./NodeType";
import PacketReceiver from "./PacketReceiver";
import ReceivedMessage from "./ReceivedMessage";
import NLPacket from "../networking/NLPacket";
import PacketScribe from "./packets/PacketScribe";
import PacketType, { protocolVersionsSignature } from "./udt/PacketHeaders";
import ContextManager from "../shared/ContextManager";
import Uuid from "../shared/Uuid";


/*@devdoc
 *  The <code>NodesList</code> class manages the domain server plus all the nodes (assignment clients) that the client is
 *  connected to. This includes their presence and communications with them via the Vircadia protocol.
 *  <p>C++: <code>NodeList : LimitedNodeList</code></p>
 *  <p>Note: This JavaScript object has a different name because <code>NodeList</code> is a JavaScript browser object.</p>
 *  @class NodesList
 *  @extends LimitedNodeList
 *  @param {number} contextID - The {@link ContextManager} context ID.
 *  @param {NodeType} [ownerType=Agent] - The type of object that the NodesList is being used in.
 */
class NodesList extends LimitedNodeList {
    // C++  NodeList : public LimitedNodeList

    private _ownerType: NodeTypeValue;
    private _connectReason = LimitedNodeList.ConnectReason.Connect;
    private _nodeTypesOfInterest: Set<NodeTypeValue> = new Set();

    private _domainHandler: DomainHandler;

    // Context objects.
    private _addressManager;

    constructor(contextID: number, ownerType = NodeType.Agent) {
        // C++  NodeList(char ownerType, int socketListenPort = INVALID_PORT, int dtlsListenPort = INVALID_PORT);

        super();

        this._ownerType = ownerType;

        // WEBRTC TODO: Address further C++ code.

        this._domainHandler = new DomainHandler(this);

        // WEBRTC TODO: Address further C++ code.

        this._addressManager = <AddressManager>ContextManager.get(contextID, AddressManager);
        this._addressManager.possibleDomainChangeRequired.connect(this._domainHandler.setURLAndID);

        // WEBRTC TODO: Address further C++ code.

        // clear our NodeList when the domain changes
        this._domainHandler.disconnectedFromDomain.connect(() => {
            // C++  void resetFromDomainHandler()
            this.reset("Reset from Domain Handler", true);
        });

        // WEBRTC TODO: Address further C++ code.

        this._packetReceiver.registerListener(PacketType.DomainList,
            PacketReceiver.makeUnsourcedListenerReference(this.processDomainList));
        this._packetReceiver.registerListener(PacketType.DomainConnectionDenied,
            PacketReceiver.makeUnsourcedListenerReference(this._domainHandler.processDomainServerConnectionDeniedPacket));

        // WEBRTC TODO: Address further C++ code.

    }


    /*@devdoc
     *  Gets the domain handler used by the NodesList.
     *  @function NodesList.getDomainHandler
     *  @returns {DomainHandler} The domain handler.
     */
    getDomainHandler(): DomainHandler {
        // C++  DomainHandler& getDomainHandler()
        return this._domainHandler;
    }

    /*@devdoc
     *  Adds node types to the set of those that the NodesList will connect to.
     *  @function NodesList.addSetOfNodeTypesToNodeInterestSet
     *  @param {Set<NodeType>} setOfNodeTypes - The node types to add to the interest set.
     */
    addSetOfNodeTypesToNodeInterestSet(setOfNodeTypes: Set<NodeTypeValue>): void {
        // C++  void addSetOfNodeTypesToNodeInterestSet(const NodeSet& setOfNodeTypes)
        for (const nodeType of setOfNodeTypes) {
            this._nodeTypesOfInterest.add(nodeType);
        }
    }

    /*@devdoc
     *  Gets the node types that the NodesList will connect to.
     *  @function NodesList.getNodeInterestSet
     *  @returns {Set<NodeType>} The node types in the interest set.
     */
    getNodeInterestSet(): Set<NodeTypeValue> {
        // C++  NodeSet& getNodeInterestSet() const { return _nodeTypesOfInterest; }
        return this._nodeTypesOfInterest;
    }


    /*@devdoc
     *  Resets the LimitedNodeList, closing all connections and deleting all node data.
     *  @function NodesList.reset
     *  @param {string} reason - The reason for resetting.
     *  @param {boolean} [skipDomainHandlerReset=false] - <code>true</code> if should skip clearing DomainHandler information,
     *      e.g., if the DomainHandler initiated the reset; <code>false</code> if should clear DomainHandler information.
     *  @returns {Slot}
     */
    override reset = (reason: string, skipDomainHandlerReset = false): void => {
        // C++  void reset(QString reason, bool skipDomainHandlerReset = false);

        super.reset(reason);

        // WEBRTC TODO: Address further C++ code.

        if (!skipDomainHandlerReset) {
            this._domainHandler.softReset(reason);
        }

        // WEBRTC TODO: Address further C++ code.

        this.setSessionUUID(new Uuid());
        this.setSessionLocalID(0);

        // WEBRTC TODO: Address further C++ code.

    };

    /*@devdoc
     *  Performs a check-in with the domain server to connect with a {@link PacketType(1)|DomainConnectRequest} packet or keep a
     *  connection alive with a {@link PacketType(1)|DomainListRequest} packet. This method should be called by the client once
     *  every second.
     *  @function NodesList.sendDomainServerCheckIn
     *  @returns {Slot}
     */
    sendDomainServerCheckIn = (): void => {
        // C++  void sendDomainServerCheckIn()

        // WEBRTC TODO: Address further C++ code.

        // The web client uses the domain URL rather than IP address.
        const domainURL = this._domainHandler.getURL();
        if (!domainURL || this._domainHandler.checkInPacketTimeout()) {
            return;
        }

        // We don't need to worry about getting our publicSockAddress because WebRTC handles this.
        // We don't need to worry about the domain handler requiring ICE because WebRTC handles this.
        // Instead, we open the WebRTC signaling and data channels if not already open.

        // Open the WebRTC signaling channel to the domain server if not already open.
        if (!this._nodeSocket.hasWebRTCSignalingChannel(domainURL)) {
            this._nodeSocket.openWebRTCSignalingChannel(domainURL);
            console.log("[networking] Opening WebRTC signaling channel. Will not send domain server check-in.");
            return;
        }
        if (!this._nodeSocket.isWebRTCSignalingChannelOpen()) {
            console.log("[networking] Waiting for WebRTC signaling channel. Will not send domain server check-in.");
            return;
        }

        // Open the WebRTC data channel to the domain server if not already open.
        if (!this._nodeSocket.hasWebRTCDataChannel(NodeType.DomainServer)) {
            console.log("[networking] Opening WebRTC data channel. Will not send domain server check-in.");
            this._nodeSocket.openWebRTCDataChannel(NodeType.DomainServer, (dataChannelID) => {
                this._domainHandler.setPort(dataChannelID);
            });
        }
        if (!this._nodeSocket.isWebRTCDataChannelOpen(NodeType.DomainServer)) {
            console.log("[networking] Waiting for WebRTC data channel. Will not send domain server check-in.");
            return;
        }

        // WEBRTC TODO: Rework the above to use QUdpSocket : QAbstractSocket style methods when add first assignment client.

        const isDomainConnected = this._domainHandler.isConnected();
        const domainPacketType = isDomainConnected ? PacketType.DomainListRequest : PacketType.DomainConnectRequest;
        const domainSockAddr = this._domainHandler.getSockAddr();

        if (!isDomainConnected) {

            // WEBRTC TODO: Address further C++ code.

        }

        // WEBRTC TODO: Address further C++ code.

        // Data common to DomainConnectRequest and DomainListRequest.
        const currentTime = BigInt(Date.now().valueOf());
        const ownerType = this._ownerType;
        const publicSockAddr = super.getPublicSockAddr();
        const localSockAddr = super.getLocalSockAddr();

        const nodeTypesOfInterest = this._nodeTypesOfInterest;
        const placeName = this._addressManager.getPlaceName();
        let username = undefined;
        let usernameSignature = undefined;
        const domainUsername = undefined;
        const domainTokens = undefined;
        if (!isDomainConnected) {
            username = "";
            usernameSignature = new Uint8Array(new ArrayBuffer(0));

            // WEBRTC TODO: Address further C++ code.

        }


        // Create and send packet.
        let packet: NLPacket | undefined = undefined;
        if (domainPacketType === PacketType.DomainConnectRequest) {

            // Data unique to DomainConnectRequest.
            const connectUUID = new Uuid(Uuid.NULL);  // Always Uuid.NULL for a web client.
            // Ignore ICE code because the Web client didn't use ICE to discover the domain server.
            const protocolVersionSig = protocolVersionsSignature();
            // WEBRTC TODO: Get MAC address.
            const hardwareAddress = "";
            const machineFingerprint = FingerprintUtils.getMachineFingerprint();
            // WEBRTC TODO: Get compressed system info.
            const compressedSystemInfo = new Uint8Array(new ArrayBuffer(0));
            const connectReason = this._connectReason;
            // WEBRTC TODO: Calculate previousConnectionUpdate value.
            const previousConnectionUptime = BigInt(0);

            // Write the packet.
            packet = PacketScribe.DomainConnectRequest.write({
                connectUUID,
                protocolVersionSig,
                hardwareAddress,
                machineFingerprint,
                compressedSystemInfo,
                connectReason,
                previousConnectionUptime,
                currentTime,
                ownerType,
                publicSockAddr,
                localSockAddr,
                nodeTypesOfInterest,
                placeName,
                isDomainConnected,
                username,
                usernameSignature,
                domainUsername,
                domainTokens
            });

        } else {

            packet = PacketScribe.DomainListRequest.write({
                currentTime,
                ownerType,
                publicSockAddr,
                localSockAddr,
                nodeTypesOfInterest,
                placeName,
                isDomainConnected,
                username,
                usernameSignature,
                domainUsername,
                domainTokens
            });

        }

        // WEBRTC TODO: Address further C++ code.

        this.sendPacket(packet, domainSockAddr);
    };

    /*@devdoc
     *  Processes a {@link PacketType(1)|DomainList} message received from the domain server.
     *  @function NodesList.processDomainList
     *  @param {ReceivedMessage} message - The DomainList message.
     *  @returns {Slot}
     */
    processDomainList = (message: ReceivedMessage): void => {
        // C++  processDomainList(ReceivedMessage* message)

        // WEBRTC TODO: This should involve a NLPacketList, not just a single NLPacket.

        const info = PacketScribe.DomainList.read(message.getMessage());

        // WEBRTC TODO: Address further C++ code.

        this.setSessionLocalID(info.newLocalID);
        this.setSessionUUID(info.newUUID);

        // WEBRTC TODO: Address further C++ code.

        if (!this._domainHandler.isConnected()) {
            this._domainHandler.setLocalID(info.domainLocalID);
            this._domainHandler.setUUID(info.domainUUID);
            this._domainHandler.setIsConnected(true);

            // WEBRTC TODO: Address further C++ code.

        }

        // WEBRTC TODO: Address further C++ code.
    };

}

export default NodesList;
