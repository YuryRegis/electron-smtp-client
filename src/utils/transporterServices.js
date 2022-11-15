function getTransporterOptions(email) {
  const provider = getEmailProvider(email);
  switch (provider) {
    case "hotmail":
      return {
        service: "Hotmail",
      };
    default:
      return {
        service: "Hotmail",
      };
  }
}

function getEmailProvider(email) {
  const emailProvider = email.split("@")[1].split(".")[0];
  return emailProvider;
}

module.exports = { getEmailProvider, getTransporterOptions };
