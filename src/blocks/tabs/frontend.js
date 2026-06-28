/**
 * Tabs Frontend Script
 */
export function initTabs() {
	const tabsContainers = document.querySelectorAll('.nexus-tabs');

	tabsContainers.forEach(container => {
		if (container.dataset.initialized) return;
		container.dataset.initialized = 'true';

		const navEl = container.querySelector('.nx-tabs-nav');
		const contentWrapper = container.querySelector('.nx-tabs-content-wrapper');
		if (!navEl || !contentWrapper) return;

		const tabItems = contentWrapper.querySelectorAll('.nx-tab-item');
		if (tabItems.length === 0) return;

		const activation = container.dataset.activation || 'click';
		const defaultOpenIndex = parseInt(container.dataset.defaultOpen || '0', 10);
		const uniqueId = container.closest('[data-nexus-id]')?.dataset.nexusId || Math.random().toString(36).substr(2, 9);

		// Build navigation
		tabItems.forEach((item, index) => {
			const tabId = item.dataset.tabId || `tab-${index}`;
			const label = item.dataset.tabLabel || `Tab ${index + 1}`;
			const iconClass = item.dataset.tabIcon || '';

			const btn = document.createElement('button');
			btn.className = 'nx-tab-label';
			btn.setAttribute('role', 'tab');
			btn.setAttribute('aria-controls', `nx-tab-panel-${uniqueId}-${tabId}`);
			btn.setAttribute('id', `nx-tab-btn-${uniqueId}-${tabId}`);
			
			let innerHTML = '';
			if (iconClass) {
				innerHTML += `<i class="${iconClass}" style="margin-right: 6px;"></i>`;
			}
			innerHTML += `<span>${label}</span>`;
			btn.innerHTML = innerHTML;

			// Assign IDs to content panels for accessibility
			item.setAttribute('role', 'tabpanel');
			item.setAttribute('id', `nx-tab-panel-${uniqueId}-${tabId}`);
			item.setAttribute('aria-labelledby', `nx-tab-btn-${uniqueId}-${tabId}`);

			const activateTab = () => {
				// Remove active classes
				navEl.querySelectorAll('.nx-tab-label').forEach(b => {
					b.classList.remove('is-active');
					b.setAttribute('aria-selected', 'false');
				});
				tabItems.forEach(t => {
					t.classList.remove('is-active');
					t.style.display = 'none';
				});

				// Add active class to current
				btn.classList.add('is-active');
				btn.setAttribute('aria-selected', 'true');
				item.classList.add('is-active');
				item.style.display = 'block';
			};

			if (activation === 'hover') {
				btn.addEventListener('mouseenter', activateTab);
				// Also keep click for mobile
				btn.addEventListener('click', activateTab);
			} else {
				btn.addEventListener('click', activateTab);
			}

			navEl.appendChild(btn);

			// Set default active tab
			if (index === defaultOpenIndex) {
				activateTab();
			} else {
				item.style.display = 'none';
			}
		});
	});
}
