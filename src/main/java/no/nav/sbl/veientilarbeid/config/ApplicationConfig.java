package no.nav.sbl.veientilarbeid.config;

import no.nav.apiapp.ApiApplication;
import org.springframework.context.annotation.Configuration;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;

import java.util.EnumSet;

import static no.nav.apiapp.ApiApplication.Sone.FSS;
import static no.nav.sbl.veientilarbeid.utils.DecoratorUtils.getDecoratorFilter;

@Configuration
public class ApplicationConfig implements ApiApplication {

    @Override
    public Sone getSone() {
        return FSS;
    }

    @Override
    public String getApplicationName() {
        return APPLICATION_NAME;
    }

    @Override
    public void startup(ServletContext servletContext) {
        FilterRegistration.Dynamic docratorfilter = servletContext.addFilter("docratorfilter", getDecoratorFilter());
        docratorfilter.addMappingForUrlPatterns(EnumSet.of(DispatcherType.FORWARD),false, "/index.html");
    }

    public static final String APPLICATION_NAME = "veientilarbeid";

}