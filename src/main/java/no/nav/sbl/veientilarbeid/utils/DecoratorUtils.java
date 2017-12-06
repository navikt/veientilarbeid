package no.nav.sbl.veientilarbeid.utils;

import no.nav.innholdshenter.common.SimpleEnonicClient;
import no.nav.innholdshenter.filter.DecoratorFilter;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;

public class DecoratorUtils {
    private static final String FRAGMENTS_URL = "common-html/v4/navno";
    private static final String APPLICATION_NAME = "aktivitetsplan";
    private static final List<String> NO_DECORATOR_PATTERNS = new ArrayList<>(asList("./rest/.*", ".*/img/.*", ".*/css/.*", ".*/js/.*", ".*/font/.*", ".*selftest.*"));
    private static final List<String> FRAGMENT_NAMES = new ArrayList<>(asList("webstats-ga-notrack", "header-withmenu", "footer", "styles", "scripts", "skiplinks", "megamenu-resources"));
    private static final String appresUrl = System.getenv("APPRES_CMS_URL");

    private static final SimpleEnonicClient enonicClient = new SimpleEnonicClient(appresUrl);

    public static DecoratorFilter getDecoratorFilter() {
        DecoratorFilter decoratorFilter = new DecoratorFilter();
        decoratorFilter.setFragmentsUrl(FRAGMENTS_URL);
        decoratorFilter.setContentRetriever(enonicClient);
        decoratorFilter.setApplicationName(APPLICATION_NAME);
        decoratorFilter.setNoDecoratePatterns(NO_DECORATOR_PATTERNS);
        decoratorFilter.setFragmentNames(FRAGMENT_NAMES);
        return decoratorFilter;
    }
}
