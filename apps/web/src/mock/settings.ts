export type LinkKeyStatus = "active" | "archived";

export type ArchiveReason = "卒業" | "休学" | "退学・退会" | "その他";

export const archiveReasons: ArchiveReason[] = [
	"卒業",
	"休学",
	"退学・退会",
	"その他",
];

export type ArchiveInfo = {
	reason: ArchiveReason;
	date: string;
};

export const linkKey = {
	status: "active" as LinkKeyStatus,
	masked: "nhk-••••-9f2c",
	full: "nhk-4f8a-9f2c",
	lastSync: "10/06 09:42",
	extension: "nhack-link v0.2.1",
};
