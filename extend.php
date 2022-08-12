<?php

namespace ClarkWinkelmann\SelectiveMediaEmbed;

use Flarum\Extend;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less')
        ->content(AdminPayload::class),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Formatter())
        ->configure(ConfigureFormatter::class),
];
