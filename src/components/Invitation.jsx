export default function Invitation({ dark }) {
  const downloadUrl = import.meta.env.VITE_APP_DOWNLOAD_URL
    || "https://egliseglorieuseduchrist2.up.railway.app";
  const invitationMessage = `Bonjour ! Je t'invite à découvrir l'application de l'Église Glorieuse du Christ (EGC). Retrouve-la ici : ${downloadUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(invitationMessage)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(downloadUrl)}&quote=${encodeURIComponent(invitationMessage)}`;
  const messageUrl = `sms:?body=${encodeURIComponent(invitationMessage)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent("Découvre l’application EGC")}&body=${encodeURIComponent(invitationMessage)}`;

  const colors = {
    background: dark ? "#242426" : "#ffffff",
    text: dark ? "#f5f5f7" : "#173b70",
    muted: dark ? "#a1a1a6" : "#6e6e73",
    border: dark ? "#38383a" : "#d2d2d7",
  };

  return (
    <main
      style={{
        minHeight: "100%",
        display: "grid",
        placeItems: "center",
        padding: "24px 8px 100px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 440,
          padding: 24,
          borderRadius: 20,
          background: colors.background,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(26,39,68,0.08)",
        }}
      >
        <div aria-hidden="true" style={{ fontSize: 44, marginBottom: 12 }}>
          💬
        </div>
        <h1 style={{ margin: "0 0 12px", fontSize: 24 }}>
          Invitez vos proches
        </h1>
        <p style={{ color: colors.muted, lineHeight: 1.6, margin: "0 0 20px" }}>
          Partagez l’application EGC avec vos proches par WhatsApp, Facebook,
          message ou e-mail.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
          }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={shareButtonStyle("#25D366")}
          >
            WhatsApp
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={shareButtonStyle("#1877F2")}
          >
            Facebook
          </a>
          <a href={messageUrl} style={shareButtonStyle("#173b70")}>
            Message
          </a>
          <a href={emailUrl} style={shareButtonStyle("#c9a84c", "#17233b")}>
            E-mail
          </a>
        </div>
        <p
          style={{
            color: colors.muted,
            fontSize: 12,
            lineHeight: 1.5,
            margin: "18px 0 0",
            overflowWrap: "anywhere",
          }}
        >
          Lien partagé : {downloadUrl}
        </p>
      </section>
    </main>
  );
}

function shareButtonStyle(background, color = "#ffffff") {
  return {
    display: "inline-flex",
    minWidth: 0,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    padding: "0 12px",
    borderRadius: 12,
    background,
    color,
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  };
}
