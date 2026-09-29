import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index/index.component';
import { IndexTwoComponent } from './pages/index/index-two/index-two.component';
import { IndexThreeComponent } from './pages/index/index-three/index-three.component';
import { IndexFourComponent } from './pages/index/index-four/index-four.component';
import { IndexFiveComponent } from './pages/index/index-five/index-five.component';
import { IndexSixComponent } from './pages/index/index-six/index-six.component';
import { IndexSevenComponent } from './pages/index/index-seven/index-seven.component';
import { BuyComponent } from './pages/buy/buy.component';
import { SellComponent } from './pages/sell/sell.component';
import { GridComponent } from './pages/listing/grid-view/grid/grid.component';
import { GridSidebarComponent } from './pages/listing/grid-view/grid-sidebar/grid-sidebar.component';
import { GridMapComponent } from './pages/listing/grid-view/grid-map/grid-map.component';
import { ListComponent } from './pages/listing/list-view/list/list.component';
import { ListSidebarComponent } from './pages/listing/list-view/list-sidebar/list-sidebar.component';
import { ListMapComponent } from './pages/listing/list-view/list-map/list-map.component';
import { PropertyDetailComponent } from './pages/listing/property-detail/property-detail/property-detail.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { AuthLoginComponent } from './pages/auth/auth-login/auth-login.component';
import { AuthSignupComponent } from './pages/auth/auth-signup/auth-signup.component';
import { AuthRePasswordComponent } from './pages/auth/auth-re-password/auth-re-password.component';
import { TermsComponent } from './pages/utility/terms/terms.component';
import { PrivacyComponent } from './pages/utility/privacy/privacy.component';
import { BlogsComponent } from './pages/blog/blogs/blogs.component';
import { BlogSidebarComponent } from './pages/blog/blog-sidebar/blog-sidebar.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { ComingsoonComponent } from './pages/special/comingsoon/comingsoon.component';
import { MaintenceComponent } from './pages/special/maintence/maintence.component';
import { ErrorComponent } from './pages/special/error/error.component';
import { ContactComponent } from './pages/contact/contact.component';
import { IndexEightComponent } from './pages/index/index-eight/index-eight.component';
import { PropertyDetailTwoComponent } from './pages/listing/property-detail/property-detail-two/property-detail-two.component';
import { AgentsComponent } from './pages/agents/agents/agents.component';
import { AgentProfileComponent } from './pages/agents/agent-profile/agent-profile.component';
import { AgenciesComponent } from './pages/agencies/agencies/agencies.component';
import { AgencyProfileComponent } from './pages/agencies/agency-profile/agency-profile.component';
import { IndexNineComponent } from './pages/index/index-nine/index-nine.component';
import { IndexTenComponent } from './pages/index/index-ten/index-ten.component';
import {DhashboardUserComponent} from './pages/dhashboard-user/dhashboard-user.component';
import {GuideComponent} from './pages/guide/guide.component';
import {SignupSuccessComponent} from './components/signup-success/signup-success.component';
import {DhashboardProprietaireComponent} from './pages/dhashboard-proprietaire/dhashboard-proprietaire.component';
import {AddPropertyComponent} from './pages/add-property/add-property.component';
import {AllPropertyComponent} from './pages/all-property/all-property.component';
import {SignupSuccessClientComponent} from './components/signup-success-client/signup-success-client.component';
import {SignecontratComponent} from './components/signecontrat/signecontrat.component';
import {AllContractsComponent} from './pages/all-contracts/all-contracts.component';
import {AddContratComponent} from './pages/add-contrat/add-contrat.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ProfileSettingComponent} from './pages/profile-setting/profile-setting.component';
import {ChatComponent} from './pages/chat/chat.component';
import {LesBiensComponent} from './pages/les-biens/les-biens.component';
import {RecommandationComponent} from './pages/recommandation/recommandation.component';
import {MescontratComponent} from './pages/mescontrat/mescontrat.component';
import {DetailContratComponent} from './pages/detail-contrat/detail-contrat.component';
import {ProprietairefavorisComponent} from './pages/proprietairefavoris/proprietairefavoris.component';
import {PropertyeditComponent} from './pages/propertyedit/propertyedit.component';

export const routes: Routes = [
    {'path':'edit-property/:id', component:PropertyeditComponent},
    {'path':'proprietaire-favoris', component:ProprietairefavorisComponent},
    {'path':'contrat-detail/:id', component:DetailContratComponent},
    {'path':'mes-contrat', component:MescontratComponent},
    {'path':'recommandation', component:RecommandationComponent},
    {'path':'biens', component:LesBiensComponent},
    {'path':'chat', component:ChatComponent},
    {'path':'profile', component:ProfileComponent},
    {'path':'profile-setting', component:ProfileSettingComponent},
    {'path':'add-contrat', component:AddContratComponent},
    {'path':'all-contracts', component:AllContractsComponent},
    {'path':'contrat/signer/:id', component:SignecontratComponent},
    {'path':'success-client', component:SignupSuccessClientComponent},
    {'path':'all-property', component:AllPropertyComponent},
    {'path':'add-property', component:AddPropertyComponent},
    {'path':'dhashboard-pro', component:DhashboardProprietaireComponent},
    {'path':'success', component:SignupSuccessComponent},
    {'path':'guide', component:GuideComponent},
    {'path':'dhashboard', component:DhashboardUserComponent},
    {'path':'', component:IndexComponent},
    {'path':'index-two', component:IndexTwoComponent},
    {'path':'index-three', component:IndexThreeComponent},
    {'path':'index-four', component:IndexFourComponent},
    {'path':'index-five', component:IndexFiveComponent},
    {'path':'index-six', component:IndexSixComponent},
    {'path':'index-seven', component:IndexSevenComponent},
    {'path':'index-eight', component:IndexEightComponent},
    {'path':'index-nine', component:IndexNineComponent},
    {'path':'index-ten', component:IndexTenComponent},
    {'path':'buy', component:BuyComponent},
    {'path':'sell', component:SellComponent},
    {'path':'grid', component:GridComponent},
    {'path':'grid-sidebar', component:GridSidebarComponent},
    {'path':'grid-map', component:GridMapComponent},
    {'path':'list', component:ListComponent},
    {'path':'list-sidebar', component:ListSidebarComponent},
    {'path':'list-map', component:ListMapComponent},
    {'path':'property-detail', component:PropertyDetailComponent},
    {'path':'property-detail-two/:id', component:PropertyDetailTwoComponent},
    {'path':'aboutus', component:AboutusComponent},
    {'path':'features', component:FeaturesComponent},
    {'path':'pricing', component:PricingComponent},
    {'path':'faqs', component:FaqsComponent},
    {'path':'auth-login', component:AuthLoginComponent},
    {'path':'auth-signup', component:AuthSignupComponent},
    {'path':'auth-re-password', component:AuthRePasswordComponent},
    {'path':'terms', component:TermsComponent},
    {'path':'privacy', component:PrivacyComponent},
    {'path': 'blogs', component:BlogsComponent},
    {'path':'blog-sidebar', component:BlogSidebarComponent},
    {'path':'blog-detail', component:BlogDetailComponent},
    {'path':'comingsoon', component:ComingsoonComponent},
    {'path':'maintenance', component:MaintenceComponent},
    {'path':'404', component:ErrorComponent},
    {'path':'contact', component:ContactComponent},
    {'path':'agents', component:AgentsComponent},
    {'path':'agent-profile', component:AgentProfileComponent},
    {'path':'agencies', component:AgenciesComponent},
    {'path':'agency-profile', component:AgencyProfileComponent},
];
