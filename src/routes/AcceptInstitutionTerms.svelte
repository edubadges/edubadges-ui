<script>
import {onMount} from "svelte";
import * as jwt_decode from "jwt-decode";
import {config} from "../util/config";
import info from "../icons/informational.svg";
import {Button, Spinner} from "../components";
import I18n from "i18n-js";
import ToggleSwitch from "../components/ToggleSwitch.svelte";
import ModalTerms from "../components/forms/FancyMarkdownModalTermsViewer.svelte";
import {userRole} from "../stores/user";
import {role as roleConstants} from "../util/role";
import {institutionDetail, requestLoginToken, validateInstitutions} from "../api";
import Modal from "../components/forms/Modal.svelte";
import {getService} from "../util/getService";
import RadioButton from "../components/forms/RadioButton.svelte";
import termsIcon from "../icons/voorwaarden-icon1.svg"
import terms2Icon from "../icons/voorwaarden-icon2.svg"

export let institutionIdentifier;
export let userHasAgreed;

let loaded = false;
let showModalTerms = false;
let termsUrl;
let termsTitle;
let institution = {};

const fetchOptions = {
  method: "GET",
  credentials: "same-origin"
};

onMount(() => {
  institutionDetail(institutionIdentifier).then(res => {
    institution = res;
    //TODO - informal / formal badge and locale
    //formal_edubadges_agreement_en_url
    const url = ``
    fetch(url, fetchOptions).then(res => res.text()).then(text => {
      htmlTerms = marked(text);
      htmlTerms = htmlTerms.replace(/<a href=/g, "<a target=\"_blank\" href=");
      cache[url] = htmlTerms;
      loaded = true;
    });

    loaded = true;
  });
});

const showTerms = (title, url) => () => {
  showModalTerms = true;
  termsUrl = url;
  termsTitle = title;
};

const closeTerms = () => showModalTerms = false;

<
/script>

< style
lang = "scss" >
.page - container
{
  display: flex;
  flex: 1;
}

.content
{
  padding: 40
  px;
}

h3
{
  color: var (
  --grey - 9
)
  ;
  font - size
:
  22
  px;
  margin: 35
  px
  0
  20
  px
  0;
}

p.terms
{
  margin: 25
  px
  0;
}

ul
{
  list - style
:
  circle;
  margin - left
:
  30
  px;
}

@media(max - width:
820
px
)
{
.
  content
  {
    width: 100 %;
  }
}

div.agree
{
  display: flex;
  align - content
:
  center;
  align - items
:
  center;
  margin: 25
  px
  0;

  p
  {
    margin - left
  :
    25
    px;

    a
    {
      text - decoration
    :
      underline;
    }
  }
}

div.actions
{
  margin - top
:
  20
  px;
  display: inline - block;
  width: 100 %;
}

div.slots
{
  display: flex;
  flex - direction
:
  column;

  div.institution - chooser
  {
    padding: 0
    0
    20
    px
    15
    px;
  }
}


<
/style>

< div
class
= "page-container" >
  < p
class="content" >
{#if loaded}
    < h1 >{I18n.t("acceptTerms.welcome", {name: claims.preferred_username})}< /h1>
    < h3 >{resign ? I18n.t("acceptTerms.renewTerms"): I18n.t("acceptTerms.acceptTerms")}< /h3>
    < p class
  = "terms" >{I18n.translations[I18n.locale].acceptTerms[$userRole].termsInfo}< /p>
    < ul >
    {#each I18n.translations[I18n.locale].acceptTerms.termsBullets[$userRole] as bullet}
      < li >{bullet}< /li>
    {/each}
    < /ul>
    < div
  class
  = "agree" >
    {@html termsIcon}
    < p >
    < span >{I18n.t(`acceptTerms.${$userRole}.overviewLinkPre`)}< /span>
    < a
  href = "/terms"
  on:click | preventDefault | stopPropagation = {
    showTerms(
      I18n.t(`acceptTerms.${$userRole}.overviewTitle`),
    I18n.t(`terms.${$userRole}.overviewTermsRaw`)
  )
  }>
  {I18n.t(`acceptTerms.${$userRole}.overviewLink`)}
  <
  /a>
  < span >{I18n.t(`acceptTerms.${$userRole}.overviewLinkPost`)}< /span>
  < /p>
  < /div>
  < div
  class
  = "agree" >
    {@html terms2Icon}
    < p >
    < span >{I18n.t(`acceptTerms.${$userRole}.termsLinkPre`)}< /span>
    < a
  href = "/terms"
  on:click | preventDefault | stopPropagation = {
    showTerms(
      I18n.t(`acceptTerms.${$userRole}.termsTitle`),
    I18n.t(`terms.${$userRole}.termsOfUseRaw`)
  )
  }>
  {I18n.t(`acceptTerms.${$userRole}.termsLink`)}
  <
  /a>
  < span >{I18n.t(`acceptTerms.${$userRole}.termsLinkPost`)}< /span>
  < span >{I18n.t(`acceptTerms.${$userRole}.privacyLinkPre`)}< /span>
  < a
  href = "/terms"
  on:click | preventDefault | stopPropagation = {
    showTerms(
      I18n.t(`acceptTerms.${$userRole}.privacyTitle`),
    I18n.t(`terms.${$userRole}.privacyPolicyRaw`)
  )
  }>
  {I18n.t(`acceptTerms.${$userRole}.privacyLink`)}
  <
  /a>
  < span >{I18n.t(`acceptTerms.${$userRole}.privacyLinkPost`)}< /span>
  < /p>
  < /div>
  < div
  class
  = "actions" >
    < Button
  text = {I18n.t("acceptTerms.accept")}
  action = {userHasAgreed}
  full = {true}/>
  </div>
{:else}
  <Spinner/>
{/if}
</div>


{#if showModalTerms}
  <ModalTerms title = {termsTitle}
  submit = {closeTerms}
  cancel = {closeTerms}
  url = {termsUrl} >
    < /ModalTerms>
{/if}

