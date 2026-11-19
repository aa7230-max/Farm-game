# 🌾 팜게임 (Farm Game)

파스텔 감성의 온라인 커플 마을 게임. 웹으로 설치해서 최대 4명이 함께 마을을 만들고, 키우고, 여행하며, 밤에 찾아오는 몬스터(또는 좀비)로부터 마을을 지킵니다.

## 특징 (계획)
- 웹 설치형 (아이폰 Safari 홈 화면 추가 / 안드로이드 Chrome 설치)
- 최대 4인 실시간 동기화
- 테마 선택: 몬스터 / 좀비 (콘텐츠 폴더만 교체)
- 마을 건설·성장, 파견 여행, 스탬프북
- 파스텔 감성 UI

## 문서
- [설계 v0.1](docs/couple-village-game-design.md)
- [설계 v0.2 (변경 사항)](docs/couple-village-design-v0.2.md)

## 폴더 구조
```
src/                  게임 코드 (TypeScript + Three.js)
public/               정적 파일, manifest, 아이콘
content/themes/       테마 팩 (monster, zombie)
supabase/migrations/  DB 스키마 SQL
docs/                 설계서
```

## 개발 상태
아직 초기 단계입니다. 로드맵은 설계서 8장(v0.2) 참고.

## 라이선스
미정. 사용하는 무료 에셋의 라이선스는 `public/assets/LICENSES.md`에 기록할 예정입니다.
