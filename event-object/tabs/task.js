const tabs = document.querySelectorAll('.tabs');

tabs.forEach((tab) => {
  const tabArray = tab.querySelectorAll('.tab');
  const contents = tab.querySelectorAll('.tab__content');

  tabArray.forEach((tab, index) => {
    tab.addEventListener('click', function () {
      tabArray.forEach((tab) => (tab.className = 'tab'));
      tab.className = 'tab tab_active';

      contents.forEach((content) => {
        content.className = 'tab__content';
      });

      contents[index].className = 'tab__content tab__content_active';
    });
  });
});