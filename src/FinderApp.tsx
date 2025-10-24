import React, { useEffect, useState } from "react";

export const FinderApp = () => {
  const [urlType, setUrlType] = useState<"previewUrl" | "dynamicUrl">("previewUrl");

  useEffect(() => {
    const run = async () => {
      const t = (window as any).TrelloPowerUp.iframe();

      const finder = await (window as any).FrontifyFinder.create({
        clientId: "client-5jnundpczaaea8ka",
        options: {
          allowMultiSelect: false,
          permanentDownloadUrls: true,
        },
      });

      finder.onAssetsChosen(async (assets: any[]) => {
        const selected = assets?.[0];
        if (selected) {
          const url =
            urlType === "previewUrl"
              ? selected.previewUrl
              : selected.dynamicUrl;

          await t.attach({
            url,
            name: selected.title || selected.fileName,
          });
        }
        finder.close();
        t.closeModal();
      });

      finder.onCancel(() => {
        finder.close();
        t.closeModal();
      });

      finder.mount(document.getElementById("finderContainer")!);
    };

    run();
  }, [urlType]);

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f9fafb",
        fontFamily: "Inter, sans-serif",
        color: "#1f2937",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <div
        id="finderContainer"
        style={{
          height: "800px",
          width: "1200px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          marginBottom: "32px",
        }}
      />

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: "20px 28px",
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontWeight: 600,
            fontSize: "16px",
            marginBottom: "12px",
          }}
        >
          Choose URL Type
        </label>

        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { value: "previewUrl", label: "Preview URL" },
            { value: "dynamicUrl", label: "Dynamic URL" },
          ].map(({ value, label }) => (
            <label
              key={value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                backgroundColor:
                  urlType === value ? "#eff6ff" : "transparent",
                padding: "10px 16px",
                borderRadius: "8px",
                border:
                  urlType === value
                    ? "2px solid #2563eb"
                    : "1px solid #d1d5db",
                transition: "all 0.2s ease",
                fontWeight: 500,
              }}
            >
              <input
                type="radio"
                name="urlType"
                value={value}
                checked={urlType === value}
                onChange={(e) =>
                  setUrlType(e.target.value as "previewUrl" | "dynamicUrl")
                }
                style={{
                  accentColor: "#2563eb",
                  transform: "scale(1.2)",
                  marginRight: "6px",
                }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
