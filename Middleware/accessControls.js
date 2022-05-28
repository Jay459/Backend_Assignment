const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("client")
        .readOwn("proflie")

    ac.grant("admin")
        .extend("client")
        .readAny("profile")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
})();