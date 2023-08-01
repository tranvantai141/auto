import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import PageButton from './PageButton';

const MIN_PREV_PAGE = 5;
const MAX_PAGE_BUTTONS = 8;

type Props = {
  numberOfPages: number;
  selectedPage: number;
  onSelectedPage: (page: number) => void;
};

type PageButton =
  | {
      type: 'ellipsis';
    }
  | {
      type: 'normal';
      page: number;
    };

const PageSelectionView = ({ numberOfPages, onSelectedPage, selectedPage }: Props) => {
  const [pageButtons, setPageButtons] = React.useState<PageButton[]>([]);

  useEffect(() => {
    const buttons: PageButton[] = [];

    if (numberOfPages <= MAX_PAGE_BUTTONS) {
      buttons.push(
        ...Array.from(
          { length: numberOfPages },
          (_, index) =>
            ({
              type: 'normal',
              page: index + 1,
            } as PageButton)
        )
      );
    } else {
      if (selectedPage < MIN_PREV_PAGE) {
        buttons.push(
          ...Array.from(
            { length: MIN_PREV_PAGE },
            (_, index) =>
              ({
                type: 'normal',
                page: index + 1,
              } as PageButton)
          )
        );
        buttons.push({ type: 'ellipsis' });
        buttons.push({ type: 'normal', page: numberOfPages });
      } else if (selectedPage < numberOfPages - 3) {
        buttons.push({ type: 'normal', page: 1 });
        buttons.push({ type: 'ellipsis' });
        buttons.push({ type: 'normal', page: selectedPage - 1 });
        buttons.push({ type: 'normal', page: selectedPage });
        buttons.push({ type: 'normal', page: selectedPage + 1 });
        buttons.push({ type: 'ellipsis' });
        buttons.push({ type: 'normal', page: numberOfPages });
      } else {
        buttons.push({ type: 'normal', page: 1 });
        buttons.push({ type: 'ellipsis' });
        buttons.push(
          ...Array.from(
            { length: MAX_PAGE_BUTTONS - 4 },
            (_, index) =>
              ({
                type: 'normal',
                page: numberOfPages - (MAX_PAGE_BUTTONS - 4) + index + 1,
              } as PageButton)
          )
        );
      }
    }

    setPageButtons(buttons);
  }, [numberOfPages, selectedPage]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <PageButton
          title="< Back"
          isSelected={false}
          onTap={() => {
            if (selectedPage > 1) {
              onSelectedPage(selectedPage - 1);
            }
          }}
        />
        {pageButtons.map((button, index) => {
          if (button.type === 'ellipsis') {
            return (
              <PageButton
                key={index}
                title="..."
                isSelected={false}
                onTap={() => {
                  console.log('Ellipsis');
                }}
              />
            );
          } else {
            return (
              <PageButton
                key={index}
                title={`${button.page}`}
                isSelected={selectedPage == button.page}
                onTap={() => {
                  onSelectedPage(button.page);
                }}
              />
            );
          }
        })}
        <PageButton
          title="Next >"
          isSelected={false}
          onTap={() => {
            if (selectedPage < numberOfPages) {
              onSelectedPage(selectedPage + 1);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default PageSelectionView;
