import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	/** 0~1 (화면 높이 비율), 낮을수록 더 닫힌 상태. 예: [0.3, 0.6, 0.9] */
	snapPoints?: number[];
	/** 열릴 때 선택될 스냅 포인트 인덱스 (기본: 0) */
	initialSnapIndex?: number;
	/** 바텀시트가 화면 하단으로부터 띄울 여백(px). 예) 하단 네비게이션 높이 */
	bottomOffsetPx?: number;
	/** 시트를 특정 컨테이너로 포털 마운트 (예: '#main-content') */
	containerSelector?: string;
	/** 배경 오버레이 표시 여부 (기본: true) */
	showOverlay?: boolean;
	/** 드래그로 완전히 내렸을 때 닫을지 여부 (기본: false – 닫히지 않음) */
	dismissible?: boolean;
}

const Overlay = styled.div<{ visible: boolean; bottomOffsetPx: number }>`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: ${(p) => p.bottomOffsetPx}px;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: ${(p) => (p.visible ? 1 : 0)};
	visibility: ${(p) => (p.visible ? "visible" : "hidden")};
	transition: opacity 0.25s ease, visibility 0.25s ease;
	z-index: 1000;
`;

const Sheet = styled.div<{ translateYPx: number; isDragging: boolean; bottomOffsetPx: number }>`
	position: absolute;
	left: 0;
	right: 0;
	bottom: ${(p) => p.bottomOffsetPx}px;
	background-color: #ffffff;
	border-radius: 16px 16px 0 0;
	box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
	transform: translateY(${(p) => p.translateYPx}px);
	transition: ${(p) => (p.isDragging ? "none" : "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)")};
	z-index: 1500; 
	height: calc(100% - ${(p) => p.bottomOffsetPx}px);
	max-height: calc(100% - ${(p) => p.bottomOffsetPx}px);
	touch-action: none; /* PWA 제스처 충돌 방지 */
`;

const Handle = styled.div`
	width: 40px;
	height: 4px;
	background-color: #d1d5db;
	border-radius: 2px;
	margin: 12px auto;
	cursor: grab;
`;

const Content = styled.div`
	height: calc(100% - 28px);
	overflow-y: auto;
	padding: 0 20px 20px 20px;
	-webkit-overflow-scrolling: touch;
`;

export default function BottomSheet({ isOpen, onClose, children, snapPoints = [0.3, 0.6, 0.9], initialSnapIndex = 0, bottomOffsetPx = 0, containerSelector, showOverlay = true, dismissible = false }: BottomSheetProps): React.JSX.Element {
	const [currentSnapIndex, setCurrentSnapIndex] = useState<number>(initialSnapIndex);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [startY, setStartY] = useState<number>(0);
	const [translateY, setTranslateY] = useState<number>(typeof window !== "undefined" ? window.innerHeight : 0);
	const draggingRef = useRef<boolean>(false);
	const sheetRootRef = useRef<HTMLDivElement | null>(null);
	const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

	const sortedSnapPoints = useMemo(() => {
		const clamped = snapPoints.map((s) => Math.max(0, Math.min(1, s)));
		return Array.from(new Set(clamped)).sort((a, b) => a - b);
	}, [snapPoints]);

	const getAvailableHeightPx = () => {
		const container = (portalEl ?? (sheetRootRef.current?.parentElement as HTMLElement | null));
		const containerHeight = container?.clientHeight ?? (typeof window !== "undefined" ? window.innerHeight : 0);
		const availableHeight = Math.max(0, containerHeight - bottomOffsetPx);
	
		
		return availableHeight;
	};
	const getSnapPx = (ratio: number) => getAvailableHeightPx() * (1 - ratio);

	const findNearestSnapIndex = (currentYPx: number) => {
		const available = getAvailableHeightPx();
		const currentRatio = available === 0 ? 0 : 1 - currentYPx / available;
		let nearest = 0;
		let minDiff = Math.abs(sortedSnapPoints[0] - currentRatio);
		for (let i = 1; i < sortedSnapPoints.length; i++) {
			const diff = Math.abs(sortedSnapPoints[i] - currentRatio);
			if (diff < minDiff) {
				minDiff = diff;
				nearest = i;
			}
		}
		return nearest;
	};

	const minYPx = () => getSnapPx(sortedSnapPoints[sortedSnapPoints.length - 1]);
	const maxYPx = () => getAvailableHeightPx();

	// 열림/닫힘 변화에 따른 초기 위치 세팅
	useEffect(() => {
		if (containerSelector) {
			const el = document.querySelector(containerSelector) as HTMLElement | null;
			setPortalEl(el);
		}
		if (isOpen) {
			const idx = Math.max(0, Math.min(sortedSnapPoints.length - 1, initialSnapIndex));
			setCurrentSnapIndex(idx);
			setTranslateY(getSnapPx(sortedSnapPoints[idx]));
		} else {
			setTranslateY(maxYPx());
		}
	}, [isOpen, sortedSnapPoints.join(","), initialSnapIndex, bottomOffsetPx, containerSelector]);

	// 리사이즈 시 위치 보정
	useEffect(() => {
		const onResize = () => {
			if (isOpen) setTranslateY(getSnapPx(sortedSnapPoints[currentSnapIndex]));
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [isOpen, currentSnapIndex, sortedSnapPoints, bottomOffsetPx, portalEl]);

	// 터치 핸들러
	const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
		if (!isOpen) return;
		draggingRef.current = true;
		setIsDragging(true);
		setStartY(e.touches[0].clientY);
	};
	const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
		if (!draggingRef.current || !isOpen) return;
		const currentY = e.touches[0].clientY;
		const diffY = currentY - startY;
		const baseY = getSnapPx(sortedSnapPoints[currentSnapIndex]);
		const newY = baseY + diffY;
		const clampedY = Math.max(minYPx(), Math.min(maxYPx(), newY));
		setTranslateY(clampedY);
	};
	const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
		if (!draggingRef.current || !isOpen) return;
		draggingRef.current = false;
		setIsDragging(false);
		if (dismissible && translateY > getAvailableHeightPx() * 0.95) {
			onClose();
			return;
		}
		const nearest = findNearestSnapIndex(translateY);
		setCurrentSnapIndex(nearest);
		setTranslateY(getSnapPx(sortedSnapPoints[nearest]));
	};

	// 마우스(데스크탑) 핸들러
	const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!isOpen) return;
		draggingRef.current = true;
		setIsDragging(true);
		setStartY(e.clientY);
	};
	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			if (!draggingRef.current || !isOpen) return;
			const diffY = e.clientY - startY;
			const baseY = getSnapPx(sortedSnapPoints[currentSnapIndex]);
			const newY = baseY + diffY;
			const clampedY = Math.max(minYPx(), Math.min(maxYPx(), newY));
			setTranslateY(clampedY);
		};
		const onMouseUp = () => {
			if (!draggingRef.current || !isOpen) return;
			draggingRef.current = false;
			setIsDragging(false);
			if (dismissible && translateY > getAvailableHeightPx() * 0.95) {
				onClose();
				return;
			}
			const nearest = findNearestSnapIndex(translateY);
			setCurrentSnapIndex(nearest);
			setTranslateY(getSnapPx(sortedSnapPoints[nearest]));
		};
		if (isDragging) {
			document.addEventListener("mousemove", onMouseMove);
			document.addEventListener("mouseup", onMouseUp);
			return () => {
				document.removeEventListener("mousemove", onMouseMove);
				document.removeEventListener("mouseup", onMouseUp);
			};
		}
	}, [isDragging, isOpen, startY, currentSnapIndex, translateY, sortedSnapPoints, bottomOffsetPx]);

	const content = (
		<>
			{showOverlay && (
				<Overlay visible={isOpen} onClick={onClose} bottomOffsetPx={bottomOffsetPx} />
			)}
			<Sheet
				translateYPx={translateY}
				isDragging={isDragging}
				ref={sheetRootRef}
				bottomOffsetPx={bottomOffsetPx}
			>
				<Handle 
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					onMouseDown={onMouseDown}
				/>
				<Content>{children}</Content>
			</Sheet>
		</>
	);

	return portalEl ? createPortal(content, portalEl) : content;
}