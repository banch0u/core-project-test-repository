import React, { useMemo } from "react";

const LicenseWatermark = ({ companyInfo, pathname }) => {
  // ----------------------------
  // URL → project mapping
  // ----------------------------
  const projectCodeFromUrl = useMemo(() => {
    const path = (pathname || "").toLowerCase();

    if (path.startsWith("/docflow")) return "docflow-api";
    if (path.startsWith("/hr")) return "hr-api";
    if (path.startsWith("/contracts")) return "contracts-api";
    if (path.startsWith("/accounts")) return "accounts-api";
    if (path.startsWith("/archive")) return "archive-api";
    if (path.startsWith("/transport")) return "transport-api";
    if (path.startsWith("/laboratory")) return "laboratory-api";

    return null;
  }, [pathname]);

  // ----------------------------
  // normalize company info
  // ----------------------------
  const rawProjects = useMemo(() => {
    if (Array.isArray(companyInfo)) {
      return companyInfo?.[0]?.projects;
    }
    return companyInfo?.projects;
  }, [companyInfo]);

  // ----------------------------
  // parse projects safely
  // ----------------------------
  const parseProjects = (raw) => {
    if (!raw || typeof raw !== "string") return [];

    try {
      let cleaned = raw.trim();
      cleaned = cleaned.replace(/^.*?\[/, "[");
      cleaned = cleaned.replace(/\}\}\\"?$/, "");
      cleaned = cleaned.replace(/\}\}$/, "");

      if (!cleaned.endsWith("]")) {
        cleaned += "]";
      }

      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse projects:", err);
      return [];
    }
  };

  const projects = useMemo(() => parseProjects(rawProjects), [rawProjects]);

  // ----------------------------
  // find current project
  // ----------------------------
  const currentProject = useMemo(() => {
    if (!Array.isArray(projects) || !projectCodeFromUrl) return null;

    return projects.find(
      (p) =>
        p?.Code?.toLowerCase().trim() ===
        projectCodeFromUrl.toLowerCase().trim(),
    );
  }, [projects, projectCodeFromUrl]);

  // ----------------------------
  // license logic
  // ----------------------------
  const licenseStatus = useMemo(() => {
    if (!currentProject?.EndDate) {
      return { status: "unknown" };
    }

    const endDate = new Date(currentProject.EndDate);
    const today = new Date();

    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
    );

    const now = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return {
        status: "expired",
        text: "Lisenziya müddəti bitib",
        color: "red",
      };
    }

    if (diffDays <= 30) {
      return {
        status: "warning",
        text: `Lisenziya müddətinin bitməsinə ${diffDays} gün qalıb`,
        color: "yellow",
      };
    }

    return { status: "valid" };
  }, [currentProject]);

  // ----------------------------
  // render
  // ----------------------------
  if (licenseStatus.status === "valid") return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: licenseStatus.color,
        fontSize: 18,
        color: "#000",
        width: "100%",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      {licenseStatus.status === "expired"
        ? "Lisenziya müddəti bitib"
        : licenseStatus.text}
    </div>
  );
};

export default LicenseWatermark;
