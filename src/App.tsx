import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import './index.css';
import styles from './App.module.css';
import { Accordion } from './components/Accordion/Accordion';
import { AgreementItem } from './components/AgreementItem/AgreementItem';
import { Asset } from './components/Asset/Asset';
import { Badge } from './components/Badge/Badge';
import { BottomCTA } from './components/BottomCTA/BottomCTA';
import { BottomSheet } from './components/BottomSheet/BottomSheet';
import { BottomTabBar } from './components/BottomTabBar/BottomTabBar';
import { CardSlot } from './components/CardSlot/CardSlot';
import { Check } from './components/Check/Check';
import { Chip } from './components/Chip/Chip';
import { ContextMenu } from './components/ContextMenu/ContextMenu';
import { CTAButton } from './components/CTAButton/CTAButton';
import { Divider } from './components/Divider/Divider';
import { EmptyState } from './components/EmptyState/EmptyState';
import { GuideHighlight } from './components/GuideHighlight/GuideHighlight';
import { GuidePopup } from './components/GuidePopup/GuidePopup';
import { HomeIndicator } from './components/HomeIndicator/HomeIndicator';
import { Icon } from './components/Icon/Icon';
import { ImageAttachment } from './components/ImageAttachment/ImageAttachment';
import { InlineSelect } from './components/InlineSelect/InlineSelect';
import { InputField } from './components/InputField/InputField';
import { Keyboard } from './components/Keyboard/Keyboard';
import { ListItem } from './components/ListItem/ListItem';
import { Modal } from './components/Modal/Modal';
import { NavBar } from './components/NavBar/NavBar';
import { Overlay } from './components/Overlay/Overlay';
import { Pagination } from './components/Pagination/Pagination';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { RadioButton } from './components/RadioButton/RadioButton';
import { SearchField } from './components/SearchField/SearchField';
import { SectionHeader } from './components/SectionHeader/SectionHeader';
import { SegmentControl } from './components/SegmentControl/SegmentControl';
import { SelectField } from './components/SelectField/SelectField';
import { SkeletonUI } from './components/SkeletonUI/SkeletonUI';
import { StatusBar } from './components/StatusBar/StatusBar';
import { StepIndicator } from './components/StepIndicator/StepIndicator';
import { Stepper } from './components/Stepper/Stepper';
import { TabList } from './components/TabList/TabList';
import { Toast } from './components/Toast/Toast';
import { Toggle } from './components/Toggle/Toggle';
import { Tooltip } from './components/Tooltip/Tooltip';
import { TopHeader } from './components/TopHeader/TopHeader';

const components = [
  { name: 'Accordion', id: 'accordion' },
  { name: 'AgreementItem', id: 'agreement-item' },
  { name: 'Asset', id: 'asset' },
  { name: 'Badge', id: 'badge' },
  { name: 'BottomCTA', id: 'bottom-cta' },
  { name: 'BottomSheet', id: 'bottom-sheet' },
  { name: 'BottomTabBar', id: 'bottom-tab-bar' },
  { name: 'CardSlot', id: 'card-slot' },
  { name: 'Check', id: 'check' },
  { name: 'Chip', id: 'chip' },
  { name: 'ContextMenu', id: 'context-menu' },
  { name: 'CTAButton', id: 'cta-button' },
  { name: 'Divider', id: 'divider' },
  // { name: 'Drawer', id: 'drawer' },
  { name: 'EmptyState', id: 'empty-state' },
  { name: 'GuideHighlight', id: 'guide-highlight' },
  { name: 'GuidePopup', id: 'guide-popup' },
  { name: 'ImageAttachment', id: 'image-attachment' },
  { name: 'InlineSelect', id: 'inline-select' },
  { name: 'InputField', id: 'input-field' },
  { name: 'ListItem', id: 'list-item' },
  { name: 'Modal', id: 'modal' },
  { name: 'NavBar', id: 'nav-bar' },
  { name: 'Overlay', id: 'overlay' },
  { name: 'Pagination', id: 'pagination' },
  { name: 'ProgressBar', id: 'progress-bar' },
  { name: 'RadioButton', id: 'radio-button' },
  { name: 'SearchField', id: 'search-field' },
  { name: 'SectionHeader', id: 'section-header' },
  { name: 'SegmentControl', id: 'segment-control' },
  { name: 'SelectField', id: 'select-field' },
  { name: 'Skeleton UI', id: 'skeleton-ui' },
  { name: 'StepIndicator', id: 'step-indicator' },
  { name: 'Stepper', id: 'stepper' },
  { name: 'TabList', id: 'tab-list' },
  { name: 'Toast', id: 'toast' },
  { name: 'Toggle', id: 'toggle' },
  { name: 'Tooltip', id: 'tooltip' },
  { name: 'TopHeader', id: 'top-header' },
  { name: 'Utility', id: 'utility' },
];

const compositionMap: Record<string, { name: string; id: string }[]> = {
  accordion: [
    { name: 'Asset', id: 'asset' },
    { name: 'Icon', id: 'asset' },
  ],
  'agreement-item': [
    { name: 'Check', id: 'check' },
    { name: 'Badge', id: 'badge' },
    { name: 'Icon', id: 'asset' },
  ],
  'bottom-cta': [{ name: 'CTAButton', id: 'cta-button' }],
  'bottom-sheet': [
    { name: 'CTAButton', id: 'cta-button' },
    { name: 'SelectField', id: 'select-field' },
  ],
  'bottom-tab-bar': [{ name: 'Icon', id: 'asset' }],
  chip: [{ name: 'Icon', id: 'asset' }],
  'context-menu': [
    { name: 'Icon', id: 'asset' },
  ],
  drawer: [
    { name: 'NavBar', id: 'nav-bar' },
    { name: 'Accordion', id: 'accordion' },
  ],
  'empty-state': [
    { name: 'Asset', id: 'asset' },
    { name: 'CTAButton', id: 'cta-button' },
  ],
  'guide-popup': [{ name: 'CTAButton', id: 'cta-button' }],
  'image-attachment': [{ name: 'Icon', id: 'asset' }],
  'inline-select': [{ name: 'Icon', id: 'asset' }],
  modal: [{ name: 'CTAButton', id: 'cta-button' }],
  'nav-bar': [
    { name: 'Icon', id: 'asset' },
    { name: 'SearchField', id: 'search-field' },
  ],
  'search-field': [{ name: 'Icon', id: 'asset' }],
  'select-field': [
    { name: 'Icon', id: 'asset' },
    { name: 'ListItem', id: 'list-item' },
  ],
  toast: [{ name: 'Icon', id: 'asset' }],
  'top-header': [
    { name: 'Badge', id: 'badge' },
    { name: 'Asset', id: 'asset' },
  ],
  utility: [
    { name: 'StatusBar', id: 'utility' },
    { name: 'Keyboard', id: 'utility' },
    { name: 'HomeIndicator', id: 'utility' },
  ],
};

const sampleAssetImage =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23D2D4EB"/><circle cx="28" cy="26" r="14" fill="%23FFFFFF" opacity="0.85"/><path d="M8 70L32 42L46 56L56 45L74 70H8Z" fill="%232B2D55"/></svg>';

const Section = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => {
  const compositions = compositionMap[id];

  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {compositions ? (
        <p className={styles.compositionNote}>
          (
          {compositions.map((composition, index) => (
            <span key={`${id}-${composition.name}`}>
              {index > 0 ? ' + ' : ''}
              <a className={styles.compositionLink} href={`#${composition.id}`}>
                {composition.name}
              </a>
            </span>
          ))}
          )
        </p>
      ) : null}
      {children}
    </section>
  );
};

const SubLabel = ({ children }: { children: ReactNode }) => (
  <p className={styles.subLabel}>{children}</p>
);

const Sample = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className={styles.sample}>
    <div className={styles.sampleBody}>{children}</div>
    <span className={styles.sampleLabel}>{label}</span>
  </div>
);

export default function App() {
  const [activeId, setActiveId] = useState(components[0].id);
  const [bottomTabIndex, setBottomTabIndex] = useState(0);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    components.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.layout}>
      <nav className={styles.lnb}>
        <p className={styles.lnbTitle}>Components</p>
        <ul className={styles.lnbList}>
          {components.map(({ name, id }) => (
            <li key={id}>
              <button
                className={[styles.lnbItem, activeId === id ? styles.lnbItemActive : ''].filter(Boolean).join(' ')}
                onClick={() => handleNavClick(id)}
                type="button"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.content}>
        <Section id="accordion" title="Accordion">
          <div className={styles.narrow}>
            <Accordion
              label="Depth1"
              isExpanded
              items={[{ label: 'Depth2' }, { label: 'Depth2', selected: true }, { label: 'Depth2' }]}
            />
          </div>
        </Section>

        <Section id="agreement-item" title="AgreementItem">
          <div className={styles.narrow}>
            <AgreementItem label="이용약관 동의" defaultChecked />
            <AgreementItem label="마케팅 정보 수신" isRequired={false} />
          </div>
        </Section>

        <Section id="asset" title="Asset">
          <SubLabel>Type / Shape</SubLabel>
          <div className={styles.sampleGrid}>
            <Sample label="Icon"><Asset variant="icon" size="sm" hasContainer={false}/></Sample>
            <Sample label="Icon + container"><Asset variant="icon" size="md" shape="rounded" hasContainer /></Sample>
            <Sample label="Image circle"><Asset variant="image" src={sampleAssetImage} alt="Sample" size="md" /></Sample>
            <Sample label="Image rounded"><Asset variant="image" src={sampleAssetImage} alt="Sample" size="lg" shape="rounded" /></Sample>
            <Sample label="Image square"><Asset variant="image" src={sampleAssetImage} alt="Sample" size="lg" shape="square" /></Sample>
          </div>
        </Section>

        <Section id="badge" title="Badge">
          <div className={styles.inlineWrap}>
            <Badge color="primary" emphasis="solid">Primary</Badge>
            <Badge color="primary" emphasis="soft">Primary</Badge>
            <Badge color="green" emphasis="solid">Green</Badge>
            <Badge color="green" emphasis="soft">Green</Badge>
            <Badge color="yellow" emphasis="solid">Yellow</Badge>
            <Badge color="yellow" emphasis="soft">Yellow</Badge>
            <Badge color="red" emphasis="solid">Red</Badge>
            <Badge color="red" emphasis="soft">Red</Badge>
            <Badge size="sm" color="gray">Small</Badge>
          </div>
        </Section>

        <Section id="bottom-cta" title="BottomCTA">
          <div className={styles.phoneSurface}>
            <BottomCTA layout={'vertical'} supportingText="변경 내용을 저장할까요?" />
          </div>
          <div className={styles.phoneSurface}>
            <BottomCTA layout={'horizontal'}/>
          </div>
        </Section>

        <Section id="bottom-sheet" title="BottomSheet">
          <div className={styles.bottomSheetSamples}>
            <div className={styles.phoneSurface}>
              <BottomSheet 
                hasOverlay
                title="로그인이 필요해요."
                description="로그인 한 회원만 기출문제를 풀 수 있어요!"
                />
            </div>
            <div className={styles.phoneSurface}>
              <BottomSheet
                hasOverlay={false}
                hasCustomContent
                primaryLabel="적용하기"
                secondaryLabel="닫기"
              >
                <SelectField label="자격증 선택" value="자격증명" helperText="자격증을 선택해주세요" />
              </BottomSheet>
            </div>
          </div>
        </Section>

        <Section id="bottom-tab-bar" title="BottomTabBar">
          <div className={styles.phoneSurface}>
            <BottomTabBar selectedIndex={bottomTabIndex} onTabChange={setBottomTabIndex} />
          </div>
        </Section>

        <Section id="card-slot" title="CardSlot">
          <div className={styles.cardSlotShowcase}>
            <div className={styles.cardSlotExample}>
              <CardSlot size="sm" />
              <span className={styles.sampleLabel}>single / sm / shadow</span>
            </div>
            <div className={styles.cardSlotExample}>
              <CardSlot size="md" />
              <span className={styles.sampleLabel}>single / md / shadow</span>
            </div>
            <div className={styles.cardSlotExample}>
              <CardSlot size="lg" />
              <span className={styles.sampleLabel}>single / lg / shadow</span>
            </div>
            <div className={styles.cardSlotExample}>
              <CardSlot size="sm" hasShadow={false} />
              <span className={styles.sampleLabel}>single / sm / no shadow</span>
            </div>
            <div className={styles.cardSlotExample}>
              <CardSlot size="md" index="multiple">
                <div>내용</div>
              </CardSlot>
              <span className={styles.sampleLabel}>multiple / md / shadow</span>
            </div>
            <div className={styles.cardSlotExample}>
              <CardSlot size="lg" index="multiple" hasPadding={false} hasShadow={false} />
              <span className={styles.sampleLabel}>multiple / lg / no padding / no shadow</span>
            </div>
          </div>
        </Section>

        <Section id="check" title="Check">
          <div className={styles.inlineWrap}>
            <Check shape="line" aria-label="line unchecked" />
            <Check shape="line" defaultChecked aria-label="line checked" />
            <Check shape="line" size="sm" defaultChecked aria-label="line checked" />
            <Check shape="circle" aria-label="circle unchecked" />
            <Check shape="circle" defaultChecked aria-label="circle checked" />
            <Check shape="circle" size="sm" defaultChecked aria-label="small checked" />
          </div>
        </Section>

        <Section id="chip" title="Chip">
          <div className={styles.inlineWrap}>
            <Chip size="sm" state="selected">Chip</Chip>
            <Chip size="sm" state="default">Chip</Chip>
            <Chip size="sm" state="selected" disabled>Chip</Chip>
            <Chip size="sm" state="default" disabled>Chip</Chip>
            <Chip size="md" state="selected">Chip</Chip>
            <Chip size="md" state="default">Chip</Chip>
            <Chip size="md" state="selected" disabled>Chip</Chip>
            <Chip size="md" state="default" disabled>Chip</Chip>
            <Chip size="md" hasLeadingIcon leadingIcon={<Icon name="check" size={18} />}>Icon</Chip>
            <Chip size="md" state="selected" hasTrailingIcon trailingIcon={<Icon name="chevronDown" size={18} />}>Icon</Chip>
          </div>
        </Section>

        <Section id="context-menu" title="ContextMenu">
          <ContextMenu
            items={[
              {
                label: '수정하기',
                hasIcon: true,
                icon: (
                  <Asset variant="icon" size={18} hasContainer={false} custom>
                    <Icon name="more" size={18} />
                  </Asset>
                ),
              },
              { label: '삭제하기', state: 'danger' },
            ]}
          />
        </Section>

        <Section id="cta-button" title="CTAButton">
          <div className={styles.inlineWrap}>
            <CTAButton>버튼</CTAButton>
            <CTAButton variant="danger">버튼</CTAButton>
            <CTAButton variant="secondary">버튼</CTAButton>
            <CTAButton variant="text">버튼</CTAButton>
            <CTAButton variant="custom">버튼</CTAButton>
          </div>
          <br />
          <div className={styles.narrow}>
            <CTAButton fullWidth>버튼</CTAButton>
            <CTAButton variant="danger" fullWidth>버튼</CTAButton>
          </div>
        </Section>

        <Section id="divider" title="Divider">
          <div className={styles.narrow}>
            <Divider />
            <Divider thickness="thick" />
          </div>
        </Section>

        {/* <Section id="drawer" title="Drawer">
          <Drawer />
        </Section> */}

        <Section id="empty-state" title="EmptyState">
          <div className={styles.emptyStateSamples}>
            <div className={styles.phoneSurface}>
              <EmptyState layout="fullscreen" />
            </div>
            <div className={styles.emptyStateCompactSample}>
              <EmptyState layout="compact" hasCTA actionLabel="둘러보기" />
            </div>
          </div>
        </Section>

        <Section id="guide-highlight" title="GuideHighlight">
          <GuideHighlight shape="rounded" highlightLevel="medium" />
        </Section>

        <Section id="guide-popup" title="GuidePopup">
          <GuidePopup hasDim={false} />
        </Section>

        <Section id="image-attachment" title="ImageAttachment">
          <div className={styles.inlineWrap}>
            <ImageAttachment />
            <ImageAttachment state="attached" src={sampleAssetImage} isRemovable />
            <ImageAttachment state="disabled" />
          </div>
        </Section>

        <Section id="inline-select" title="InlineSelect">
          <div className={styles.inlineWrap}>
            <InlineSelect label="학년" value="중1" />
            <InlineSelect label="과목" value="수학" isOpen />
            <InlineSelect state="disabled" label="반" value="A반" />
          </div>
        </Section>

        <Section id="input-field" title="InputField">
          <div className={styles.narrow}>
            <InputField label="아이디" placeholder="플레이스홀더" hintText="가입 시 사용한 이메일을 입력해주세요." />
            <InputField label="인증 시간" placeholder="입력해주세요" suffixText="분" defaultValue="05" />
            <InputField label="오류 상태" isRequired errorText="필수 입력입니다." placeholder="내용" />
            <InputField label="읽기 전용" value="hello@email.com" readOnly />
          </div>
        </Section>

        <Section id="list-item" title="ListItem">
          <div className={styles.narrow}>
            <ListItem leadingSlot={<Asset variant="icon" hasContainer />} title="수강 과목" description="오늘의 학습을 확인하세요" trailingSlot={<Icon name="chevronRight" size={18} />} />
            <ListItem state="selected" title="선택된 항목" trailingSlot={<Icon name="check" size={18} />} />
          </div>
        </Section>

        <Section id="modal" title="Modal">
          <div className={styles.modalSamples}>
            <div className={styles.phoneSurface}>
              <Modal hasOverlay={false} actionLayout="double" />
            </div>
            <div className={styles.phoneSurface}>
              <Modal hasOverlay actionLayout="double" title="오버레이 모달" description="뒤에 Overlay가 깔린 상태예요." />
            </div>
          </div>
        </Section>

        <Section id="nav-bar" title="NavBar">
          <div className={styles.phoneSurface}>
            <NavBar variant="titleCenter" title="페이지 제목" />
            <NavBar variant="search" />
          </div>
        </Section>

        <Section id="overlay" title="Overlay">
          <div className={styles.overlayDemo}>
            <Overlay>Overlay</Overlay>
          </div>
        </Section>

        <Section id="pagination" title="Pagination">
          <Pagination currentPage={2} scrollHint="end" />
        </Section>

        <Section id="progress-bar" title="ProgressBar">
          <div className={styles.narrow}>
            <ProgressBar value={40} size="sm" />
            <ProgressBar value={70} size="md" />
            <ProgressBar value={90} size="lg" />
          </div>
        </Section>

        <Section id="radio-button" title="RadioButton">
          <div className={styles.inlineWrap}>
            <RadioButton name="demo-radio" label="기본" />
            <RadioButton name="demo-radio" label="선택됨" state="selected" />
            <RadioButton label="비활성" disabled />
          </div>
        </Section>

        <Section id="search-field" title="SearchField">
          <div className={styles.narrow}>
            <SearchField />
            <SearchField value="검색어" readOnly />
          </div>
        </Section>

        <Section id="section-header" title="SectionHeader">
          <SectionHeader title="오늘의 수업" description="진행 중인 수업을 확인하세요." action={<CTAButton variant="text">더보기</CTAButton>} />
        </Section>

        <Section id="segment-control" title="SegmentControl">
          <SegmentControl items={[{ label: '전체', value: 'all' }, { label: '진행', value: 'active' }, { label: '완료', value: 'done' }]} value="active" />
        </Section>

        <Section id="select-field" title="SelectField">
          <div className={styles.narrow}>
            <SelectField label="강의 선택" value="수학 심화반" />
            <SelectField label="열림 상태" isOpen>
              <ListItem title="수학 심화반" padding={false} />
            </SelectField>
          </div>
        </Section>

        <Section id="skeleton-ui" title="Skeleton UI">
          <div className={styles.inlineWrap}>
            <SkeletonUI type="text" />
            <SkeletonUI type="list" />
            <SkeletonUI type="card" />
          </div>
        </Section>

        <Section id="step-indicator" title="StepIndicator">
          <div className={styles.inlineWrap}>
            <StepIndicator current={1} />
            <StepIndicator size="md" count={4} current={2} />
          </div>
        </Section>

        <Section id="stepper" title="Stepper">
          <Stepper current={1} steps={[{ label: '정보 입력' }, { label: '확인' }, { label: '완료' }]} />
        </Section>

        <Section id="tab-list" title="TabList">
          <TabList tabs={[{ label: '전체', value: 'all' }, { label: '공지', value: 'notice' }, { label: '자료', value: 'file' }]} value="notice" />
        </Section>

        <Section id="toast" title="Toast">
          <Toast message="저장되었습니다." />
        </Section>

        <Section id="toggle" title="Toggle">
          <div className={styles.inlineWrap}>
            <Toggle />
            <Toggle defaultOn />
            <Toggle disabled />
          </div>
        </Section>

        <Section id="tooltip" title="Tooltip">
          <div className={styles.inlineWrap}>
            <Tooltip message="도움말" />
            <Tooltip message="위쪽 꼬리" arrowPlacement="top" arrowAlign="start" size="md" />
          </div>
        </Section>

        <Section id="top-header" title="TopHeader">
          <TopHeader title="학습 현황" subtitle="이번 주 진행률을 확인하세요." />
        </Section>

        <Section id="utility" title="Utility">
          <div className={styles.phoneSurface}>
            <StatusBar />
            <Keyboard />
            <HomeIndicator />
          </div>
        </Section>
      </main>
    </div>
  );
}
