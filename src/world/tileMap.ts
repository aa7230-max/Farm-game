// 타일 맵의 레이어 구조. 프로토타입의 ground / fringe / collision 3층 구조를 옮긴 것입니다.
// 팜게임에서는 마을 건설 칸과 여행 지역 맵에 같은 구조를 씁니다.

export interface TileLayers {
  width: number;
  height: number;
  ground: number[];     // 바닥 타일 ID (0 = 없음)
  fringe: number[];     // 장식 타일 ID. 풀숲 등 조우 구역 표시에도 사용
  collision: number[];  // 0 = 통과 가능, 그 외 = 막힘
}

export function idx(map: TileLayers, x: number, y: number): number {
  return y * map.width + x;
}

export function isBlocked(map: TileLayers, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return true;
  return map.collision[idx(map, x, y)] !== 0;
}
