import { useState } from "react";
import { ResultModal } from "@/components/results/ResultModal";
import type { UserSajuData } from "@/types/api";
import styles from "@/styles/SajuDetailResults.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// Shared Profile Header Component (Left Aligned, No Avatar)
// ─────────────────────────────────────────────────────────────────────────────
function ProfileHeader({ profile }: { profile: UserSajuData["profile"] }) {
	return (
		<div className={styles.headerArea}>
			<p className={styles.charName}>{profile.nickname}</p>
			<p className={styles.charSub}>{profile.soul_title}</p>
			<p className={styles.charDesc}>{profile.core_description}</p>

			<div className={styles.mbtiContainer}>
				<p className={styles.mbtiLabel}>매칭 MBTI</p>
				<div className={styles.mbtiBadges}>
					{profile.matching_mbti.map(mbti => <div key={mbti} className={styles.mbtiBadge}>{mbti}</div>)}
				</div>
			</div>
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. 오행 상세 정보
// ─────────────────────────────────────────────────────────────────────────────
interface OhaengInfoProps {
	data: UserSajuData["five_elements"];
	profile: UserSajuData["profile"];
}

export function SajuOhaengInfoResult({ data, profile }: OhaengInfoProps) {
	const [showModal, setShowModal] = useState(false);

	const ELEMENT_MAP: Record<string, { cx: number; cy: number }> = {
		"Earth": { cx: 350, cy: 579 },
		"Metal": { cx: 510, cy: 697 },
		"Water": { cx: 450, cy: 886 },
		"Wood": { cx: 250, cy: 886 },
		"Fire": { cx: 188, cy: 697 },
	};

	const elements = data.map(el => ({ ...el, ...ELEMENT_MAP[el.type] }));
	const SHENG_ARROWS = [{ x1: 488, y1: 776, x2: 473, y2: 811 }, { x1: 368, y1: 887, x2: 329, y2: 887 }, { x1: 221, y1: 812, x2: 211, y2: 771 }, { x1: 253, y1: 651, x2: 285, y2: 626 }, { x1: 419, y1: 620, x2: 453, y2: 642 }];
	const KE_ARROWS = [{ x1: 268, y1: 720, x2: 427, y2: 720 }, { x1: 355, y1: 661, x2: 401, y2: 816 }, { x1: 429, y1: 729, x2: 303, y2: 822 }, { x1: 397, y1: 819, x2: 268, y2: 726 }, { x1: 297, y1: 819, x2: 346, y2: 666 }];
	const ROW_YS = [646, 718, 790, 862, 934];

	return (
		<div className={styles.root}>
			<ProfileHeader profile={profile} />

			<div className={styles.sectionHeader}>
				<p className={styles.sectionTitle}>오행 분석</p>
				<div className={styles.searchIcon} onClick={() => setShowModal(true)}>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" /><line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" /></svg>
				</div>
			</div>

			<svg className={styles.chartSvg} viewBox="0 0 1920 1080">
				<defs>
					<marker id="arrow-sheng-detail" markerWidth="14" markerHeight="10" refX="14" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L14,5 L0,10 Z" fill="rgb(0,95,255)" /></marker>
					<marker id="arrow-ke-detail" markerWidth="14" markerHeight="10" refX="14" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L14,5 L0,10 Z" fill="rgb(255,84,73)" /></marker>
				</defs>
				<rect x={696} y={537} width={1114} height={433} fill="#fdfdfd" rx={25} stroke="#000" />
				<path d="M721,537 Q696,537 696,562 L696,610 L1810,610 L1810,562 Q1810,537 1785,537 Z" fill="#FFD5E1" stroke="#000" />
				<line x1={903} y1={537} x2={903} y2={970} stroke="#000" />
				<line x1={1103} y1={537} x2={1103} y2={970} stroke="#000" />
				{[682, 754, 826, 898].map((y, i) => <line key={i} x1={696} y1={y} x2={1810} y2={y} stroke="#000" />)}
				<text x={746} y={578} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={500}>오행 요소</text>
				<text x={949} y={578} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={500}>비율</text>
				<text x={1126} y={578} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={500}>특징</text>
				{elements.map((row, i) => (
					<g key={row.type}>
						<text x={746} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" dominantBaseline="central">{row.name_ko}</text>
						<text x={953} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" dominantBaseline="central">{row.ratio_percent}%</text>
						<text x={1134} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" dominantBaseline="central">{row.characteristics}</text>
					</g>
				))}
				{KE_ARROWS.map((a, i) => <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="rgb(255,84,73)" strokeWidth={4} markerEnd="url(#arrow-ke-detail)" />)}
				{SHENG_ARROWS.map((a, i) => <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="rgb(0,95,255)" strokeWidth={4} markerEnd="url(#arrow-sheng-detail)" />)}
				{elements.map((el) => (
					<g key={el.type}>
						<circle cx={el.cx} cy={el.cy} r={72} fill="#fff" stroke="rgb(255,31,124)" strokeWidth={2} />
						<text x={el.cx} y={el.cy - 14} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600}>{el.name_ko}</text>
						<text x={el.cx} y={el.cy + 14} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600}>{el.ratio_percent}%</text>
					</g>
				))}
			</svg>
			{showModal && <ResultModal title="오행이란?" subtitle="오행은 목,화,토,금,수 다섯 가지로 이루어져 있으며 비율과 조합에 따라 다양한 성향과 성격을 나타냅니다." body="
	  	목  : 성장력, 추친력, 포부, 목표지향적, 낙천성
		화 : 열정, 소유욕, 모성애
		토 : 포용력, 이해심, 계산적, 실리주의
		금 : 결단력, 절제력, 이상적, 분석적
		수 : 유연함, 처세술, 임기응변, 수용적" onClose={() => setShowModal(false)} />}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. 능력치 상세 정보
// ─────────────────────────────────────────────────────────────────────────────
export function SajuAbilityInfoResult({ stats }: { stats: UserSajuData["stats"] }) {
	const [showModal, setShowModal] = useState(false);
	const CX = 365, CY = 463, MAX_R = 184;
	const toRad = (deg: number) => (deg * Math.PI) / 180;
	const polyPoints = (cx: number, cy: number, r: number) => Array.from({ length: 5 }, (_, i) => { const a = toRad(-90 + 72 * i); return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(" ");
	const statPoints = () => stats.map((s, i) => { const a = toRad(-90 + 72 * i); const r = (s.score / 100) * MAX_R; return `${CX + r * Math.cos(a)},${CY + r * Math.sin(a)}`; }).join(" ");
	const ROW_YS = [337, 415, 493, 571, 649];
	const RINGS = [184, 150.5, 114.5, 75.5, 46.5];

	return (
		<div className={styles.root}>
			<div className={styles.sectionHeader} style={{ top: '60px' }}>
				<p className={styles.pageTitle}>능력치</p>
				<div className={styles.searchIcon} style={{ top: '0', left: '140px' }} onClick={() => setShowModal(true)}>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" /><line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" /></svg>
				</div>
			</div>

			<svg className={styles.chartSvg} viewBox="0 0 1920 1080">
				{RINGS.map((r, i) => <polygon key={i} points={polyPoints(CX, CY, r)} fill={i === 0 ? "white" : "none"} stroke="rgba(200,160,175,0.7)" strokeDasharray="4 4" />)}
				{[0, 1, 2, 3, 4].map(i => { const a = toRad(-90 + 72 * i); return <line key={i} x1={CX} y1={CY} x2={CX + MAX_R * Math.cos(a)} y2={CY + MAX_R * Math.sin(a)} stroke="rgba(200,160,175,0.5)" strokeDasharray="4 4" />; })}
				<polygon points={statPoints()} fill="rgba(255,120,166,0.35)" stroke="#FF78A6" strokeWidth={2} />
				{stats.map((s, i) => {
					const a = toRad(-90 + 72 * i);
					const r = (s.score / 100) * MAX_R;
					return <ellipse key={i} cx={CX + r * Math.cos(a)} cy={CY + r * Math.sin(a)} rx={8} ry={8} fill="#FF8DAE" />;
				})}
				{stats.map((s, i) => {
					const a = toRad(-90 + 72 * i);
					const r = MAX_R + 30;
					return <text key={i} x={CX + r * Math.cos(a)} y={CY + r * Math.sin(a)} textAnchor="middle" dominantBaseline="central" fontSize={25} fontFamily="Paperlogy" fill="#5E3535" fontWeight={500}>{s.name_ko}</text>;
				})}

				<rect x={690} y={219} width={1142} height={469} fill="rgba(255,255,255,0.82)" rx={25} stroke="#000" />
				<path d="M715,219 L1807,219 Q1832,219 1832,244 L1832,298 L690,298 L690,244 Q690,219 715,219 Z" fill="#FFD5E1" stroke="#000" />
				<line x1={914} y1={219} x2={914} y2={688} stroke="#000" />
				<line x1={1131} y1={219} x2={1131} y2={688} stroke="#000" />
				{[376, 454, 532, 610].map((y, i) => <line key={i} x1={690} y1={y} x2={1832} y2={y} stroke="#000" />)}
				<text x={741} y={258} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600} dominantBaseline="central">능력치 항목</text>
				<text x={963} y={258} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600} dominantBaseline="central">점수 0/100</text>
				<text x={1178} y={258} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600} dominantBaseline="central">상태</text>
				{stats.map((row, i) => (
					<g key={i}>
						<text x={744} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600} dominantBaseline="central">{row.name_ko}</text>
						<text x={966} y={ROW_YS[i]} fontFamily="Paperlogy" dominantBaseline="central"><tspan fontSize={21} fill="#5E3535" fontWeight={600}>{row.score} </tspan><tspan fontSize={18} fill="#848484" fontWeight={500}>/ 100</tspan></text>
						<text x={1175} y={ROW_YS[i]} fontSize={21} fontFamily="Paperlogy" fill="#5E3535" fontWeight={600} dominantBaseline="central">{row.status} ({row.status_description})</text>
					</g>
				))}
			</svg>
			{showModal && <ResultModal title="능력치란?" subtitle="사주 분석을 통해 도출된 타고난 기질과 역량입니다."
				body="인내심 : 어려운 상황이나 스트레스를 묵묵히 견뎌내는 끈기와 최고 수준의 맷집을 의미합니다.
				실행력 : 목표를 정하면 주저하지 않고 끝까지 밀어붙여 결과를 만들어내는 추진력입니다.
				재물운 : 자산을 안정적으로 모으고 관리하며, 현실적인 이익을 감지하는 힘을 뜻합니다.
				사회성 : 필요에 따라 관계를 맺는 선택적 성향으로, 독립성과 대인관계의 균형을 보여줍니다.
				창의력 : 이상적인 아이디어보다는 현실적이고 실용적인 가치를 우선시하는 성향을 나타냅니다." onClose={() => setShowModal(false)} />}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 커리어 상세 정보
// ─────────────────────────────────────────────────────────────────────────────
interface CareerDetailProps {
	career: UserSajuData["career"];
	fortune: UserSajuData["fortune"];
}

export function SajuCareerDetailResult({ career, fortune }: CareerDetailProps) {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className={styles.root}>
			<div className={styles.sectionHeader} style={{ top: '60px' }}>
				<p className={styles.sectionTitle} style={{ top: '0', left: '0' }}>나의 일잘러 성향 리포트</p>
				<div className={styles.searchIcon} style={{ top: '0', left: '400px' }} onClick={() => setShowModal(true)}>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#FCDEE6" strokeWidth="2" /><line x1="11.5" y1="11.5" x2="16.5" y2="16.5" stroke="#FCDEE6" strokeWidth="2" strokeLinecap="round" /></svg>
				</div>
			</div>

			<div className={`${styles.infoBar} ${styles.bar1}`}><span className={styles.infoLabel}>추천 직업</span><div className={styles.barDivider} /><span className={styles.infoValue}>{career.recommended_jobs.join(", ")}</span></div>
			<div className={`${styles.infoBar} ${styles.bar2}`}><span className={styles.infoLabel}>업무 스타일</span><div className={styles.barDivider} /><span className={styles.infoValue}>{career.work_style}</span></div>
			<div className={`${styles.infoBar} ${styles.bar3}`}><span className={styles.infoLabel}>주의할 점</span><div className={styles.barDivider} /><span className={styles.infoValue}>{career.warning_note}</span></div>

			<div className={styles.partnerContainer}>
				<div className={styles.partnerItem}>
					<h3 className={styles.partnerTitle}>최고의 파트너</h3>
					<p className={styles.partnerDesc}>{fortune.best_partner}</p>
				</div>
				<div className={styles.partnerItem}>
					<h3 className={styles.partnerTitle}>조심할 파트너</h3>
					<p className={styles.partnerDesc}>{fortune.worst_partner}</p>
				</div>
			</div>

			{showModal && <ResultModal title="나의 일잘러 성향 리포트란?" subtitle="종합적인 사주 기운을 바탕으로, 실제 환경에서 내가 어떤 방식으로 일하고 타인과 어떻게 상호작용하는지 분석한 리포트입니다." body="종합적인 사주 기운을 바탕으로 분석된 결과입니다." onClose={() => setShowModal(false)} />}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. 부스터 상세 정보
// ─────────────────────────────────────────────────────────────────────────────
interface BoosterDetailProps {
	fortune: UserSajuData["fortune"];
}

function getSwatchBg(colorName: string): string {
	const n = colorName.toLowerCase();
	if (n.includes("red") || n.includes("빨")) return "#e53935";
	if (n.includes("green") || n.includes("초록") || n.includes("녹")) return "#43a047";
	if (n.includes("blue") || n.includes("파랑") || n.includes("파란") || n.includes("청")) return "#1e88e5";
	if (n.includes("sky") || n.includes("하늘")) return "#29b6f6";
	if (n.includes("navy") || n.includes("남")) return "#0d47a1";
	if (n.includes("purple") || n.includes("보라")) return "#8e24aa";
	if (n.includes("pink") || n.includes("분홍")) return "#e91e8c";
	if (n.includes("orange") || n.includes("주황")) return "#f57c00";
	if (n.includes("gold") || n.includes("금색")) return "#FFD700";
	if (n.includes("yellow") || n.includes("노랑") || n.includes("노란") || n.includes("황")) return "#fdd835";
	if (n.includes("brown") || n.includes("갈")) return "#8B4513";
	if (n.includes("silver") || n.includes("은")) return "#9e9e9e";
	if (n.includes("mint") || n.includes("민트")) return "#26a69a";
	if (n.includes("beige") || n.includes("베이지")) return "#d7c5a0";
	if (n.includes("white") || n.includes("흰") || n.includes("하얀") || n.includes("백")) return "#f5f5f5";
	if (n.includes("black") || n.includes("검") || n.includes("흑")) return "#212121";
	return "#FF68A7";
}

function getSwatchTextColor(colorName: string): string {
	const n = colorName.toLowerCase();
	const isLight = n.includes("white") || n.includes("흰") || n.includes("하얀") || n.includes("백")
		|| n.includes("yellow") || n.includes("노랑") || n.includes("노란") || n.includes("황")
		|| n.includes("gold") || n.includes("금색") || n.includes("beige") || n.includes("베이지");
	return isLight ? "#5E3535" : "#fff";
}

export function SajuBoosterDetailResult({ fortune }: BoosterDetailProps) {
	return (
		<div className={styles.root}>
			<div className={styles.sectionHeader} style={{ top: '60px' }}>
				<p className={styles.pageTitle}>행운 부스터</p>
			</div>

			<div className={styles.boosterContainer}>
				<div className={styles.boosterItem}>
					<h3 className={styles.boosterTitle}>행운의 색상</h3>
					<div className={styles.boosterCard}>
						<div className={styles.swatchGroup}>
							{fortune.lucky_colors.map((color, i) => (
								<div key={i} className={styles.swatch} style={{ background: getSwatchBg(color) }}>
									<span className={styles.swatchLabel} style={{ color: getSwatchTextColor(color) }}>{color}</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={styles.boosterItem}>
					<h3 className={styles.boosterTitle}>행운의 숫자</h3>
					<div className={styles.boosterCard}>
						<p className={styles.luckyNumber}>{fortune.lucky_numbers.join(", ")}</p>
					</div>
				</div>
				<div className={styles.boosterItem}>
					<h3 className={styles.boosterTitle}>행운의 음식</h3>
					<div className={styles.boosterCard}>
						<p className={styles.foodName}>{fortune.lucky_food.split(" (")[0]}</p>
						<p className={styles.foodReason}>{fortune.lucky_food.split(" (")[1]?.replace(")", "")}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
