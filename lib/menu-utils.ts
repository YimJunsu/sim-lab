// 메뉴 유틸리티 함수 모음
// 컨디션/카테고리 기반 메뉴 추출 및 랜덤 선택 기능 제공

import menuItemsData from '@/data/menu/menu-items.json';
import menuConditionsData from '@/data/menu/menu-conditions.json';
import menuCategoriesData from '@/data/menu/menu-categories.json';

// 메뉴 아이템 타입 정의
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  conditions: string[];
  description: string;
  nutrition: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    sodium: number;
  };
  tags: string[];
  kakaoSearchKeyword: string;
}

// 컨디션 타입 정의
export interface MenuCondition {
  id: string;
  label: string;
  emoji: string;
  menuIds: string[];
}

// 카테고리 타입 정의
export interface MenuCategoryData {
  id: string;
  label: string;
  emoji: string;
  menuIds: string[];
}

// 전체 메뉴 목록
export const ALL_MENUS: MenuItem[] = menuItemsData.menus as MenuItem[];

// 전체 컨디션 목록
export const ALL_CONDITIONS: MenuCondition[] = menuConditionsData.conditions;

// 전체 카테고리 목록
export const ALL_CATEGORIES: MenuCategoryData[] = menuCategoriesData.categories;

// 컨디션 ID로 해당 메뉴 중 랜덤 1개 추출
export function getMenuByCondition(conditionId: string): MenuItem | null {
  const condition = ALL_CONDITIONS.find((c) => c.id === conditionId);
  if (!condition || condition.menuIds.length === 0) return null;
  const randomId = condition.menuIds[Math.floor(Math.random() * condition.menuIds.length)];
  return ALL_MENUS.find((m) => m.id === randomId) ?? null;
}

// 카테고리 ID로 해당 메뉴 중 랜덤 1개 추출
export function getMenuByCategory(categoryId: string): MenuItem | null {
  const category = ALL_CATEGORIES.find((c) => c.id === categoryId);
  if (!category || category.menuIds.length === 0) return null;
  const randomId = category.menuIds[Math.floor(Math.random() * category.menuIds.length)];
  return ALL_MENUS.find((m) => m.id === randomId) ?? null;
}

// 전체 메뉴 중 완전 랜덤 1개 추출
export function getRandomMenu(): MenuItem {
  return ALL_MENUS[Math.floor(Math.random() * ALL_MENUS.length)];
}

// ID로 메뉴 아이템 조회
export function getMenuById(id: string): MenuItem | undefined {
  return ALL_MENUS.find((m) => m.id === id);
}

// 룰렛 애니메이션에 표시할 음식 이름 목록 (20개 샘플)
export const ROULETTE_ITEMS = ALL_MENUS.slice(0, 20).map((m) => m.name);
