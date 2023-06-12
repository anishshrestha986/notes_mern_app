export const scrollToThePosition = (positionId: string) => {
    const section = document.querySelector( `#${positionId}` );
    section?.scrollIntoView();
  };

