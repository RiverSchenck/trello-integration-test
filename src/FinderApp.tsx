import React, { useEffect, useState } from "react";

export const FinderApp = () => {
  const [urlType, setUrlType] = useState<"previewUrl" | "dynamicUrl">(
    "previewUrl"
  );

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
              ? selected.previewUrl || selected.cdn
              : selected.dynamicUrl || selected.cdn;

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
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          padding: "20px",
          maxWidth: "600px",
          marginBottom: "24px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: 600,
            fontSize: "16px",
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
                  urlType === value ? "#f3f4f6" : "transparent",
                padding: "10px 14px",
                borderRadius: "8px",
                transition: "all 0.2s",
                border:
                  urlType === value
                    ? "2px solid #2563eb"
                    : "1px solid #d1d5db",
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
                style={{ accentColor: "#2563eb", transform: "scale(1.2)" }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div
        id="finderContainer"
        style={{
          height: "800px",
          width: "1200px",
        }}
      />
    </div>
  );
};
