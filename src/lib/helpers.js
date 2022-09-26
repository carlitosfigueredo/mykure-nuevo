const helpers = {};
helpers.encriptarPassword = async(passwordAdministrador) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordAdministrador, salt);
    return hashedPassword;
};

helpers.revisarPassword = async(passwordAdministrador, savedPassword) => {
    try {
        await bcrypt.compare(passwordAdministrador, savedPassword);
    } catch (e) {
        console.log(e); // se puede enviar por flah para mostrar error al cliente
    }
}
module.exports = helpers;