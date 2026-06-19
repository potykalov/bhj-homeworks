const hasTooltipsEl = document.querySelectorAll('.has-tooltip');

hasTooltipsEl.forEach((hasTooltipEl) => {
  const tooltipEl = document.createElement('div');

  tooltipEl.className = 'tooltip';
  tooltipEl.textContent = hasTooltipEl.title;
  tooltipEl.dataset.position = 'bottom';

  hasTooltipEl.removeAttribute('title');
  hasTooltipEl.after(tooltipEl);

  hasTooltipEl.addEventListener('click', (e) => {
    e.preventDefault();

    const isActive = tooltipEl.classList.contains('tooltip_active');

    document.querySelectorAll('.tooltip').forEach((tooltipEl) => {
      tooltipEl.classList.remove('tooltip_active');
    });

    if (isActive) {
      return;
    }

    tooltipEl.classList.add('tooltip_active');

    const rect = hasTooltipEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    if (tooltipEl.dataset.position === 'bottom') {
      tooltipEl.style.left = `${rect.left}px`;
      tooltipEl.style.top = `${rect.bottom}px`;
    }

    if (tooltipEl.dataset.position === 'top') {
      tooltipEl.style.left = `${rect.left}px`;
      tooltipEl.style.top = `${rect.top - tooltipRect.height}px`;
    }

    if (tooltipEl.dataset.position === 'left') {
      tooltipEl.style.left = `${rect.left - tooltipRect.width}px`;
      tooltipEl.style.top = `${rect.top}px`;
    }

    if (tooltipEl.dataset.position === 'right') {
      tooltipEl.style.left = `${rect.right}px`;
      tooltipEl.style.top = `${rect.top}px`;
    }
  });
});
