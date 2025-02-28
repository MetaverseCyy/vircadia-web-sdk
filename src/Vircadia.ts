//
//  Vircadia.ts
//
//  Vircadia Web SDK.
//
//  Created by David Rowe on 9 May 2021.
//  Copyright 2021 Vircadia contributors.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

/*@sdkdoc
 *  The <code>Vircadia</code> API provides information on the Vircadia SDK.
 *
 *  @namespace Vircadia
 *  @property {string} version - The version number of the SDK. <em>Read-only.</em>
 */
const Vircadia = new class {

    #_version = "0.0.1";

    get version() {
        return this.#_version;
    }

}();

export default Vircadia;
export { Vircadia };
export { default as DomainServer } from "./DomainServer";
