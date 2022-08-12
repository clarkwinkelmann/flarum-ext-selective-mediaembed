<?php

namespace ClarkWinkelmann\SelectiveMediaEmbed;

use Flarum\Settings\SettingsRepositoryInterface;
use s9e\TextFormatter\Configurator;

class ConfigureFormatter
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(Configurator $configurator)
    {
        $siteIds = json_decode($this->settings->get('clarkwinkelmann-selective-mediaembed.enabledSites'));

        if (!is_array($siteIds)) {
            return;
        }

        foreach ($siteIds as $siteId) {
            $configurator->MediaEmbed->add($siteId);
        }
    }
}
