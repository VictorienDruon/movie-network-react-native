const accent = {
	accent1: "#fdfcfe",
	accent2: "#fbfaff",
	accent3: "#f5f2ff",
	accent4: "#ede9fe",
	accent5: "#e4defc",
	accent6: "#d7cff9",
	accent7: "#c4b8f3",
	accent8: "#aa99ec",
	accent9: "#6e56cf",
	accent10: "#644fc1",
	accent11: "#5746af",
	accent12: "#2f265f",
};

const accentDark = {
	accent1: "#17151f",
	accent2: "#1c172b",
	accent3: "#271f3f",
	accent4: "#2d254c",
	accent5: "#342a58",
	accent6: "#3d316a",
	accent7: "#4c3e89",
	accent8: "#6654c0",
	accent9: "#6e56cf",
	accent10: "#836add",
	accent11: "#b399ff",
	accent12: "#e2ddfe",
};

const gray = {
	gray1: "#fdfcfd",
	gray2: "#faf9fb",
	gray3: "#f3f1f5",
	gray4: "#eceaef",
	gray5: "#e6e3e9",
	gray6: "#dfdce3",
	gray7: "#d5d3db",
	gray8: "#bcbac7",
	gray9: "#8e8c99",
	gray10: "#817f8b",
	gray11: "#65636d",
	gray12: "#211f26",
};

const grayDark = {
	gray1: "#191719",
	gray2: "#1e1a1e",
	gray3: "#2b272c",
	gray4: "#332f35",
	gray5: "#3a363c",
	gray6: "#423e45",
	gray7: "#4d4951",
	gray8: "#625f69",
	gray9: "#6f6d78",
	gray10: "#82808b",
	gray11: "#b1afb8",
	gray12: "#eeeef0",
};

const error = {
	error1: "#fffcfc",
	error2: "#fff8f7",
	error3: "#fff0ee",
	error4: "#ffe6e2",
	error5: "#fdd8d3",
	error6: "#fac7be",
	error7: "#f3b0a2",
	error8: "#ea9280",
	error9: "#e54d2e",
	error10: "#d84224",
	error11: "#c33113",
	error12: "#5c271f",
};

const errorDark = {
	error1: "#1d1412",
	error2: "#291612",
	error3: "#3b1a14",
	error4: "#471d16",
	error5: "#532017",
	error6: "#652318",
	error7: "#862919",
	error8: "#ca3416",
	error9: "#e54d2e",
	error10: "#f46d52",
	error11: "#ff8870",
	error12: "#fbd3cb",
};

const success = {
	success1: "#fafefd",
	success2: "#f1fcfa",
	success3: "#e7f9f5",
	success4: "#d9f3ee",
	success5: "#c7ebe5",
	success6: "#afdfd7",
	success7: "#8dcec3",
	success8: "#53b9ab",
	success9: "#12a594",
	success10: "#0e9888",
	success11: "#067a6f",
	success12: "#0d3d38",
};

const successDark = {
	success1: "#091a16",
	success2: "#091f1a",
	success3: "#0d2923",
	success4: "#0f312b",
	success5: "#123a32",
	success6: "#16463d",
	success7: "#1b5e54",
	success8: "#238b7f",
	success9: "#12a594",
	success10: "#0abba4",
	success11: "#0bd8b6",
	success12: "#adf0dd",
};

const warning = {
	warning1: "#fdfdf9",
	warning2: "#fffbe0",
	warning3: "#fff8c6",
	warning4: "#fcf3af",
	warning5: "#f7ea9b",
	warning6: "#ecdd85",
	warning7: "#dac56e",
	warning8: "#c9aa45",
	warning9: "#fbe32d",
	warning10: "#f9da10",
	warning11: "#775f28",
	warning12: "#473b1f",
};

const warningDark = {
	warning1: "#1c1500",
	warning2: "#221a04",
	warning3: "#2c230a",
	warning4: "#342a0e",
	warning5: "#3d3211",
	warning6: "#493d14",
	warning7: "#615119",
	warning8: "#8f7d24",
	warning9: "#fbe32d",
	warning10: "#fcea5c",
	warning11: "#ffee33",
	warning12: "#fff5ad",
};

const info = {
	info1: "#fafdfe",
	info2: "#f2fcfd",
	info3: "#e7f9fb",
	info4: "#d8f3f6",
	info5: "#c4eaef",
	info6: "#aadee6",
	info7: "#84cdda",
	info8: "#3db9cf",
	info9: "#05a2c2",
	info10: "#0894b3",
	info11: "#0c7792",
	info12: "#0d3c48",
};

const infoDark = {
	info1: "#07191d",
	info2: "#0b1d22",
	info3: "#0f272e",
	info4: "#112f37",
	info5: "#143741",
	info6: "#17444f",
	info7: "#1d5b6a",
	info8: "#28879f",
	info9: "#05a2c2",
	info10: "#13b7d8",
	info11: "#20d0f3",
	info12: "#b6ecf7",
};

export const palette = {
	mainBackground: "#ffffff",
	...accent,
	...gray,
	...error,
	...success,
	...warning,
	...info,
};

export const paletteDark = {
	mainBackground: "#000000",
	...accentDark,
	...grayDark,
	...errorDark,
	...successDark,
	...warningDark,
	...infoDark,
};
