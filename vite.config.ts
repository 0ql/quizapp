import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from "unocss/vite"
import { extractorSvelte, presetIcons, presetUno } from "unocss"
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), Unocss({
		extractors: [extractorSvelte],
		presets: [presetUno(), presetIcons()]
	})]
};

export default config;
