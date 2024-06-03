<script>
	export let tab = {}
	export let activeTab = null

	function click() {
		tab.Activate()
		activeTab = tab
	}

	let favicon =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJUlEQVR42mKgOogpKJBMTM08kJCS+RXAJ1UbVBRDUWQIRmACWmwEpHxuN8GpkRIdAOuRfehwnQDXe7696C+eJkdvoox+ceEd/7DWFZyUcinO6JNBf3FOP/z+HGXirkX0hzXs8YJbG78ZvHp2dtaP/3E+Owqwcv1aJLDGSl8Ap6kY7JDmcjfK6UklaDvR4iBfy/Zq+19cyCETqF7AdAiilF6RGbYV0hFWOm9dbyYBiu0QIBcK85XLm090guoDGI3AUPiOM3HJrtbhKs8XBvh7k4mO+DkNMWC0CL6saS5D1Q0IERcRrBKdVy729Ti0apaojlEFHvI1k+Q03t6HESOeMUbjILUJCpo0bK8C7DxI9ezFMtibDuiLQY8oDJn/h5yUKctM1AYAkF4mBkXjJukAAAAASUVORK5CYII="

	tab.GetFavicon().then((icon) => {
		if (icon !== null) {
			favicon = icon
		}
	})
</script>

<li class:active={activeTab == tab}>
	<button on:click={click}>
		<div>
			{#if tab.IsPinned()}
				<img
					alt="Pinned"
					class="small-icon"
					src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%235F6368'%3E%3Cpath fill='%235F6368' d='M6.672,15.914l-5.379,5.379c-0.391,0.391-0.391,1.023,0,1.414C1.488,22.902,1.744,23,2,23 s0.512-0.098,0.707-0.293l5.379-5.379L6.672,15.914z'%3E%3C/path%3E %3Cpath fill='%235F6368' d='M23.707,7.293l-7-7c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l0.908,0.908L5.18,8.766 L3.707,7.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l13,13C15.488,21.902,15.744,22,16,22s0.512-0.098,0.707-0.293 c0.391-0.391,0.391-1.023,0-1.414l-1.473-1.473l6.151-11.021l0.908,0.908C22.488,8.902,22.744,9,23,9s0.512-0.098,0.707-0.293 C24.098,8.316,24.098,7.684,23.707,7.293z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E"
				/>
			{/if}
			{#if tab.IsAudible()}
				{#if tab.IsMuted()}
					<img
						alt="Audible"
						class="small-icon"
						src="data:image/svg+xml,%3Csvg width='514' height='514' viewBox='0 0 514 514' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M91.0847 152.096H47.0223C21.6049 152.096 1 172.683 1 198.079L1.00023 317.348C1.00023 342.742 21.6051 363.33 47.0225 363.33H91.8942L216.437 475.166C224.611 482.5 240.684 492.271 257.933 483.588C274.181 475.412 277.134 457.681 277.134 446.818V338.145L91.0847 152.096ZM388.709 333.755L347.913 292.959C356.44 285.973 363.426 273.51 363.426 257C363.426 234.285 350.199 219.228 337.929 215.561L332.416 213.915C320.241 210.278 313.321 197.467 316.962 185.302L320.257 174.288C323.897 162.122 336.719 155.209 348.894 158.846L354.408 160.492C395.068 172.638 420.953 213.349 420.953 257C420.953 286.602 409.05 314.849 388.709 333.755ZM341.903 402.915C339.124 407.991 338.248 414.114 339.928 420.127L343.019 431.199C346.436 443.431 359.129 450.579 371.368 447.167L376.91 445.622C378.901 445.066 380.879 444.477 382.841 443.853L341.903 402.915ZM454.813 399.86L414.127 359.174C439.235 334.3 455.472 298.142 455.472 257.003C455.472 191.387 414.167 138.443 361.448 123.745L355.907 122.2C343.665 118.787 336.511 106.106 339.928 93.8757L343.019 82.8032C346.436 70.5726 359.129 63.4247 371.368 66.8375L376.91 68.3822C456.521 90.5781 513 167.756 513 257.003C513 312.853 490.88 363.979 454.813 399.86ZM277.134 222.18L152.189 97.2349L216.437 38.8516C224.583 31.5395 240.663 21.7179 257.935 30.406C274.207 38.5901 277.134 56.3607 277.134 67.2001V222.18Z' fill='%23B4B8BD'/%3E%3Crect x='-8.20508' y='32.8066' width='58' height='691.981' rx='22' transform='rotate(-45 -8.20508 32.8066)' fill='%23B4B8BD'/%3E%3C/svg%3E%0A"
					/>
				{:else}
					<img
						alt="Muted"
						class="small-icon"
						src="data:image/svg+xml,%3Csvg width='513' height='513' viewBox='0 0 513 513' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M276.134 66.2001C276.134 55.3607 273.207 37.5901 256.935 29.406C239.663 20.7179 223.583 30.5395 215.437 37.8516L90.816 151.096H46.0223C20.6049 151.096 0 171.683 0 197.079L0.000230424 316.348C0.000230424 341.742 20.6051 362.33 46.0225 362.33H90.8942L215.437 474.166C223.611 481.5 239.684 491.271 256.933 482.588C273.181 474.412 276.134 456.681 276.134 445.818V66.2001Z' fill='%23B4B8BD'/%3E%3Cpath d='M375.91 67.3822L370.368 65.8375C358.129 62.4247 345.436 69.5726 342.019 81.8032L338.928 92.8757C335.511 105.106 342.665 117.788 354.907 121.2L360.448 122.745C413.167 137.443 454.472 190.387 454.472 256.003C454.472 321.617 413.167 374.561 360.448 389.259L354.907 390.802C342.665 394.216 335.511 406.898 338.928 419.127L342.019 430.199C345.436 442.431 358.129 449.579 370.368 446.167L375.91 444.622C455.521 422.426 512 345.247 512 256.003C512 166.756 455.521 89.5781 375.91 67.3822Z' fill='%23B4B8BD'/%3E%3Cpath d='M353.408 159.492L347.894 157.846C335.719 154.209 322.897 161.122 319.257 173.288L315.962 184.302C312.321 196.467 319.241 209.278 331.416 212.915L336.929 214.561C349.199 218.228 362.426 233.285 362.426 256C362.426 278.717 349.199 293.774 336.929 297.439L331.416 299.085C319.241 302.722 312.321 315.533 315.962 327.698L319.257 338.713C322.897 350.877 335.719 357.791 347.894 354.154L353.408 352.507C394.068 340.361 419.953 299.653 419.953 256C419.953 212.349 394.068 171.638 353.408 159.492Z' fill='%23B4B8BD'/%3E%3C/svg%3E%0A"
					/>
				{/if}
			{/if}
			<img alt="Favicon" src={favicon} class="favicon" />
			<span>{tab.GetTitle()}</span>
		</div>
		<p>{tab.GetURL()}</p>
	</button>
</li>

<style>
	li {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background-color: rgb(42, 42, 42);
		border-width: 0;
		margin: 0;
		border-radius: 8px;
		cursor: pointer;
		padding: 8px;
	}

	li * {
		cursor: inherit;
	}

	li:hover {
		background-color: rgb(50, 55, 61);
	}

	li.active {
		border-color: #507054;
		border-width: 4px;
		border-left-style: solid;
		border-right-style: solid;
	}

	button {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		line-height: normal;
		text-align: left;
		display: block;
	}

	button {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	button > div > span {
		font-size: 14px;
		font-weight: 500;
		color: rgb(225, 225, 225);
	}

	button > p {
		font-size: 10px;
		font-weight: 400;
		color: rgb(190, 200, 220);
		margin: 0;
	}

	div {
		display: flex;
		gap: 8px;
	}

	img.small-icon {
		width: 10px;
		height: 10px;
	}

	img.favicon {
		width: 14px;
		height: 14px;
	}
</style>
