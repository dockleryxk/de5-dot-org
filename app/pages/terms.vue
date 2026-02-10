<template lang="pug">
//- Legal terms and disclaimer page
section.section
  .container
    .content
      h1.title Terms &amp; Disclaimer

      //- Section 1: Disclaimer
      h2 Disclaimer
      p.
        DE5.org aggregates community knowledge from forums, owner experiences, and publicly
        available sources related to the Acura Integra Type S (DE5). Content published on this
        site is not verified, endorsed, or guaranteed by DE5.org, Acura, Honda Motor Co., Ltd.,
        or any manufacturer, dealer, or service provider.
      p.
        All information is provided "as is" without warranty of any kind, express or implied,
        including but not limited to the warranties of accuracy, completeness, reliability, or
        fitness for a particular purpose. Use of any information on this site is at your own risk.
        Always consult official service manuals and qualified professionals before performing
        maintenance, modifications, or repairs on your vehicle.

      //- Section 2: Source Attribution
      h2 Source Attribution
      p.
        FAQ answers and other content on DE5.org include source links to original forum posts,
        discussions, and other publicly available materials where information was found. These
        source links are provided for reference and transparency.
      ul
        li Source links may become outdated or broken over time as external sites change.
        li DE5.org is not affiliated with, endorsed by, or responsible for the content of any
          |  linked external sources.
        li The inclusion of a source link does not imply endorsement of that source or its content.

      //- Section 3: Not Professional Advice
      h2 Not Professional Advice
      p.
        Content on DE5.org does not constitute professional mechanical, legal, financial, or any
        other form of professional advice. Information is shared for educational and informational
        purposes only.
      ul
        li.
          Vehicle modifications, maintenance, and repairs should be performed by qualified
          professionals.
        li.
          DE5.org is not liable for any damages, injuries, or losses resulting from the use of
          information found on this site.
        li.
          Always verify information with your vehicle's official service manual and a certified
          technician before acting on any content found here.

      //- Section 4: Community Content
      h2 Community Content
      p.
        The information on DE5.org is crowdsourced from the Acura Integra Type S owner community
        and may contain inaccuracies, outdated information, or errors. Users are encouraged to
        verify all information independently before relying on it.
      p.
        If you find incorrect or misleading information on this site, please let us know so we
        can review and correct it.

      //- Section 5: Trademarks
      h2 Trademarks
      p.
        Acura, Integra, and Type S are registered trademarks of Honda Motor Co., Ltd. DE5.org is
        an independent community project and is not affiliated with, endorsed by, or sponsored by
        Honda Motor Co., Ltd. or any of its subsidiaries. All other trademarks mentioned on this
        site are the property of their respective owners.
</template>

<script setup lang="ts">
// Page metadata for Terms & Disclaimer
useHead({ title: 'Terms & Disclaimer' })
useSeoMeta({
  ogTitle: 'Terms & Disclaimer | DE5.org',
  ogDescription: 'Legal disclaimer and terms of use for DE5.org community knowledge hub.',
})
</script>
